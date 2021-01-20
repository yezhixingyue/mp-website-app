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
export interface IProductClass {
  First: number;
  Second?: number; 
}

export interface ICondtion4ProList {
  Page: number;
  PageSize: number;
  KeyWords?: string;
  ProductClass?: IProductClass;

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

export interface IArticleType {
  ID: string;
  Name: string;
  ProductClass: {
    FirstLevelID: number;
    FirstLevelName: string;
    SecondLevelID: number;
    SecondLevelName: string;
  };
  Content: string;
  AboutList: IProductType[];
}

export interface IProductPageState {
  productClassify: IClassifyItem[];
  productList: IProductType[];
  DataNumber: number;
  curLv1Class: number;
  curLv2Class: number;
  curProduct: null | IArticleType;
  Page: number;
  Loading: boolean;
  lv2List: BaseClassifyItem[];
}

/* NEWS STORE TYPE
----------------------------------------------------------------------------------- */
export interface INewsHelpsAboutType {
  Cover: string;
  ID: number;
  Introduce: string;
  Title: string;
}

export interface INewsHelpsArticleType {
  AboutList: INewsHelpsAboutType[];
  Class: {
    ID: number;
    Name: string;
  };
  Content: string;
  Cover: string;
  CreateTime: string;
  ID: number;
  Introduce: string;
  NextArticle: INewsHelpsAboutType;
  PreArticle: INewsHelpsAboutType;
  ReadCount: number;
  Title: string;
  TopShow: boolean;
}

export enum ArticleGetEnumType {
  'news' = 0,
  'helps' = 1,
}

export interface IArticleClassType {
  CreateTime: string;
  ID: number;
  Index: number;
  Level: number;
  Name: string;
  ParentID: number;
  Type: ArticleGetEnumType;
}

/* HELP PAGE TYPE
----------------------------------------------------------------------------------- */
export enum HelpPageEnumType {
  'question' = 1,
  'software' = 2,
  'print' = 3,
  'agreement' = 4,
  'statement' = 5,
}

export enum ArticleClassEnum {
  'news' = 0,
  'help' = 1,
}

export interface IParams4GetHelpList {
  Type: number;
  Page?: number;
  PageSize?: number;
  KeyWords?: string;
}

export interface IHelpClassItemType {
  CreateTime: string;
  ID: number;
  Index: number;
  Level: number;
  Name: string;
  ParentID: number;
  Type: number;
}

export interface IArticleListItemType {
  Class: {
    ID: number;
    Name: null | string;
  };
  Content: null | string;
  CreateTime: string;
  ID: number;
  ReadCount: number;
  Title: string;
}

export interface IHelpDetailType {
  Class: {
    ID: number;
    Name: null | string;
  };
  Content: string;
  CreateTime: string;
  ID: number;
  ReadCount: number;
  Title: string;
}
/* COMPLETE STORE TYPE
----------------------------------------------------------------------------------- */

export interface IStore {
  home: IHomePageState;
  user: null | User;
  product: IProductPageState;
}


/* SETUP
----------------------------------------------------------------------------------- */
export enum SetupEnumType {
  baseUrl = 'http://192.168.1.92:8055/',
  downloadUrl = 'https://www.mpzj.cn/Private/Files/6373284376831804391773893001.rar',
}

/* OPINION
----------------------------------------------------------------------------------- */
export interface IOpinionSubmitType {
  Phone: string;
  Email: string;
  Content: string;
  NickName: string;
}