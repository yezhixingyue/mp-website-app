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


/* LOGIN PAGE
----------------------------------------------------------------------------------- */
export interface ILoginPagrms {
  Mobile: string;
  Password: string;
}

export interface User {
  CustomerID: string;
  CustomerName: string;
  CustomerSN: string;
  Mobile: string;
  AuthStatus: number;
  Account: {
    Token: string;
  }
}

/* PRODUCT PAGE
----------------------------------------------------------------------------------- */
// 1. 请求相关
export interface ICondtion4ProList {
  Page: number;
  PageSize: number;
  KeyWords?: string;
  ProductClass?: {
    First: number;
    Second?: number; 
  }

}

// 2. 仓库相关
export interface BaseClassifyItem { // 类别
  ID: number;
  ClassName: string;
  ParentID: number;
  Level: number;
}
export interface IClassifyItem extends BaseClassifyItem{
  children: BaseClassifyItem[]
}

export interface IProductType { // 单个产品
  Cover: string;
  Introduce: string;
  ID: string;
  Name: string;
  ProductClass: {
    FirstLevelID: number;
    FirstLevelName: string;
    SecondLevelID: number;
    SecondLevelName: string;
  };
}

export interface IProductPageState {
  productClassify: IClassifyItem[];
  productList: IProductType[];
  DataNumber: number;
  curLv1Class: number;
  curLv2Class: number;
  curProduct: null;
  Page: number;
}



/* COMPLETE STORE TYPE
----------------------------------------------------------------------------------- */

export interface IStore {
  home: IHomePageState;
  user: null | User;
  product: IProductPageState;
}
