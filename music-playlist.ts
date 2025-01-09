import { ILinkedList, LinkedList } from "./linked-lists";

interface Song {
  id: string;
  title: string;
  artist: string;
}

type SongType = Song | null;

interface IMusicPlayerList extends ILinkedList<Song> {
  getCurrentSong(): SongType;
  getNextSong(): SongType;
  getPreviousSong(): SongType;
  goToNext(): SongType;
  goToPrevious(): SongType;
  toggleShuffle(): void;
}

export class MusicPlayerList
  extends LinkedList<Song>
  implements IMusicPlayerList
{
  private isShuffle: boolean = false;

  get isShuffleEnabled(): boolean {
    return this.isShuffle;
  }

  getCurrentSong(): SongType {
    return this.currentNode?.value ?? null;
  }

  getNextSong(): SongType {
    return this.currentNode?.next?.value ?? null;
  }

  getPreviousSong(): SongType {
    return this.currentNode?.prev?.value ?? null;
  }

  goToNext(): SongType {
    const newNode = this.currentNode?.next ?? this.head;
    this.currentNode = newNode;

    return this.getCurrentSong();
  }

  goToPrevious(): SongType {
    const newNode = this.currentNode?.prev ?? this.tail;
    this.currentNode = newNode;

    return this.getCurrentSong();
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
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
  { id: "1", title: "Bohemian Rhapsody", artist: "Queen" },
  { id: "2", title: "Hotel California", artist: "Eagles" },
  { id: "3", title: "Sweet Child O Mine", artist: "Guns N Roses" },
  { id: "4", title: "Stairway to Heaven", artist: "Led Zeppelin" },
  { id: "5", title: "Imagine", artist: "John Lennon" },
]);

console.log("Shuffle enabled:", samplePlaylist.isShuffleEnabled);
console.log("Current song:", samplePlaylist.getCurrentSong());
console.log("Next song:", samplePlaylist.goToNext());
console.log("Next song:", samplePlaylist.goToNext());
console.log("Prev song:", samplePlaylist.goToPrevious());
console.log("Toggling Shuffle...");
samplePlaylist.toggleShuffle();
console.log("Shuffle enabled:", samplePlaylist.isShuffleEnabled);
