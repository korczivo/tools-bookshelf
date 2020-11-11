export interface Story {
  title: string;
  description: string;
  link: string;
}

export interface StoryService extends StoryBase {
  story: Story;
}

export interface StoryBase {
  id?: any;
  owner_id?: any;
  user_id?: any;
}
