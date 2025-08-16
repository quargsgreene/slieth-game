export interface NodeOptions {
  node_id: number;
  text: string[];
  node_images: string[];
  audio: string[];
  puzzles: string[];
  apiData: unknown[];
  layoutOption: number;
  value: number;
  active: boolean;
}

export class GameNode {
  constructor(
    public node_id: number,
    public text: string[],
    public node_images: string[],
    public audio: string[],
    public puzzles: string[],
    public apiData: unknown[],
    public layoutOption: number,
    public value: number,
    public active: boolean,
  ) {}

  get getNodeId(): number { return this.node_id; }
  get getNodeText(): string[] { return this.text; }
  get getImages(): string[] { return this.node_images; }
  get getAudio(): string[] { return this.audio; }
  get getPuzzles(): string[] { return this.puzzles; }
  get getApiData(): unknown[] { return this.apiData; }
  get getValue(): number { return this.value; }
  get isActive(): boolean { return this.active; }

  set setId(newId: number) { this.node_id = newId; }
  set setText(newText: string[]) { this.text = newText; }
  set setImages(newImages: string[]) { this.node_images = newImages; }
  set setAudio(newAudio: string[]) { this.audio = newAudio; }
  set setPuzzles(newPuzzles: string[]) { this.puzzles = newPuzzles; }
  set setApiData(newApiData: unknown[]) { this.apiData = newApiData; }
  set toggleActive(activityState: boolean) { this.active = activityState; }
}

