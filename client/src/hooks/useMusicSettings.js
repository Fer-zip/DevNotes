import { useState, useEffect } from 'react';

export const useMusicSettings = () => {
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem('userPlaylists');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(p => {
          if (p.url && p.url.includes('soundhelix.com')) {
            if (p.id === '1') return { ...p, name: 'Lo-fi Chill Beats', url: 'https://www.chosic.com/wp-content/uploads/2021/07/Rain-and-Tears-Sad-Lofi-Beat.mp3' };
            if (p.id === '2') return { ...p, name: 'Lluvia Relajante', url: 'https://www.soundjay.com/nature/sounds/rain-07.mp3' };
          }
          if (p.id === '3' && p.url && p.url.includes('jfKfPfyJRdk')) {
            return { ...p, name: 'Estudio Lofi (Playlist)', url: 'https://www.youtube.com/embed/videoseries?list=PL590L5gVw84wH3w458wGgqM4g1oP3zN_f' };
          }
          return p;
        });
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: '1', name: 'Lo-fi Chill Beats', type: 'audio', url: 'https://www.chosic.com/wp-content/uploads/2021/07/Rain-and-Tears-Sad-Lofi-Beat.mp3' },
      { id: '2', name: 'Lluvia Relajante', type: 'audio', url: 'https://www.soundjay.com/nature/sounds/rain-07.mp3' },
      { id: '3', name: 'Estudio Lofi (Playlist)', type: 'youtube', url: 'https://www.youtube.com/embed/videoseries?list=PL590L5gVw84wH3w458wGgqM4g1oP3zN_f' }
    ];
  });

  const [activePlaylistId, setActivePlaylistId] = useState(() => {
    return localStorage.getItem('activePlaylistId') || '1';
  });

  useEffect(() => {
    localStorage.setItem('userPlaylists', JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem('activePlaylistId', activePlaylistId);
  }, [activePlaylistId]);

  const convertSpotifyUrl = (url) => {
    if (url.includes('spotify.com/')) {
      const parts = url.split('spotify.com/')[1]?.split('?')[0]?.split('/');
      if (parts && parts.length >= 2) {
        const type = parts[0]; // e.g. 'playlist', 'track', 'album'
        const id = parts[1];
        return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`;
      }
    }
    return url;
  };

  const convertSoundCloudUrl = (url) => {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%233b82f6&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
  };

  const convertYouTubeUrl = (url) => {
    // 1. Detectar si hay una lista de reproducción (playlist)
    if (url.includes('list=')) {
      const playlistId = url.split('list=')[1]?.split('&')[0];
      
      // Si también incluye un video específico dentro de la lista
      if (url.includes('v=')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}?list=${playlistId}`;
      }
      
      return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
    }

    // 2. Videos individuales
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const addPlaylist = (playlist) => {
    let finalUrl = playlist.url.trim();
    let finalType = playlist.type;

    // Auto-detectar plataforma basado en el enlace si está en 'auto' o si detecta dominios
    if (finalType === 'auto' || playlist.url.includes('spotify.com') || playlist.url.includes('soundcloud.com') || playlist.url.includes('youtube.com') || playlist.url.includes('youtu.be')) {
      if (playlist.url.includes('spotify.com')) {
        finalUrl = convertSpotifyUrl(playlist.url);
        finalType = 'spotify';
      } else if (playlist.url.includes('soundcloud.com')) {
        finalUrl = convertSoundCloudUrl(playlist.url);
        finalType = 'soundcloud';
      } else if (playlist.url.includes('youtube.com') || playlist.url.includes('youtu.be')) {
        finalUrl = convertYouTubeUrl(playlist.url);
        finalType = 'youtube';
      } else {
        finalType = 'audio';
      }
    } else {
      // Si el tipo es forzado y no detecta dominios anteriores
      if (finalType === 'youtube') {
        finalUrl = convertYouTubeUrl(playlist.url);
      } else if (finalType === 'spotify') {
        finalUrl = convertSpotifyUrl(playlist.url);
      } else if (finalType === 'soundcloud') {
        finalUrl = convertSoundCloudUrl(playlist.url);
      }
    }

    setPlaylists(prev => [...prev, { ...playlist, url: finalUrl, type: finalType, id: Date.now().toString() }]);
  };

  const removePlaylist = (id) => {
    setPlaylists(prev => prev.filter(p => p.id !== id));
    if (activePlaylistId === id) setActivePlaylistId(playlists[0]?.id || '');
  };

  const activePlaylist = playlists.find(p => p.id === activePlaylistId) || playlists[0];

  return { playlists, activePlaylist, setActivePlaylistId, addPlaylist, removePlaylist };
};
