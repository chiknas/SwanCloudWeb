export type FilesResponse = {
  nextCursor: string;
  nodes: Node[];
};

export type Node = {
  id: string;
  fileName: string;
  createdDate: Date;
};
