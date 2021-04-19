export type FilesResponse = {
  nextCursor: string;
  nodes: Node[];
};

export type Node = {
  id: number;
  fileName: string;
  createdDate: Date;
};
