export type CMSPlugin = {
  beforeRenderList?: (props: any) => any;
  beforeSavePost?: (post: any) => any;
  afterPublish?: (post: any) => void;
};
