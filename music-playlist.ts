import { ILinkedList, LinkedList } from "./linked-lists";

interface Song {
  id: string;
  title: string;
  artist: string;
}

type SongType = Song | null;

interface IMusicPlayerList extends ILinkedList<Song> {
  getCurrentSong(): SongType;
}

export class MusicPlayerList
  extends LinkedList<Song>
  implements IMusicPlayerList
{
  getCurrentSong(): SongType {
    return this.currentNode?.value ?? null;
  }

  static fromArray(songs: Song[]): MusicPlayerList {
    const playlist = new MusicPlayerList();
    for (const song of songs) {
      playlist.append(song);
    }
    playlist.currentNode = playlist.head;
    return playlist;
  }
}

const samplePlaylist = MusicPlayerList.fromArray([
  {
    id: "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
  },
  {
    id: "2",
    title: "Hotel California",
    artist: "Eagles",
  },
  {
    id: "3",
    title: "Sweet Child O Mine",
    artist: "Guns N Roses",
  },
]);

console.log("Current song:", samplePlaylist.getCurrentSong());
