export type Note = {

  id:string;
  title:string;
  content: EditorResponse;
  folder_id:string;
  created_at: Date;
  last_updated : Date;

};


export type EditorResponse = {

  time: number;
  blocks: EditorBlock[],
  version:string;

}

type EditorBlock = {

    id:string;
    type:string;
    data:{
      text?:string;
      level?:number;
      items?:string[];
    }

}

