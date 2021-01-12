/* HOME PAGE
  ----------------------------------------------------------------------------------- */
export interface ISwiperItemData { // HomePage use
  ID: number;
  Title: string;
  Pic: string;
  Url: string;
  TopShow: boolean;
}

export interface INewsDataItem { // HomePage use
  Cover: string;
  TopShow: boolean;
  ID: number;
  Title: string;
  Introduce: null | string;
  Class: {
    ID: number;
    Name: null | string;
  }
}

export interface Il1ClassItemType { // 产品一级分类
  ID: number;
  ClassName: string;
  ParentID: number;
  Level: number;
}

export interface IProductNewsItem {
  ID: string;
  Name: string;
  Introduce: string;
  Cover: string;
  ProductClass: {
    FirstLevelID: number;
    FirstLevelName: string;
    SecondLevelID: number;
    SecondLevelName: string;
  }
}

export interface IHomePageState {
  swiperData: ISwiperItemData[];
  newsDate: INewsDataItem[];
  lv1Classify: Il1ClassItemType[];
  products: IProductNewsItem[];
}

export interface IStore {
  home: IHomePageState;
}


/* LOGIN PAGE
  ----------------------------------------------------------------------------------- */
  export interface ILoginPagrms {
    Mobile: string;
    Password: string;
  }