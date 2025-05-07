import { News } from "@/shared/types/news";

import { atomWithStorage } from "jotai/utils";

const initialFormState: News = {
  name: "",
  description: "",
  thumbnail: "",
  is_active: true,
};

const newsFormAtom = atomWithStorage<News>("newsForm", initialFormState);

export { newsFormAtom, initialFormState };
