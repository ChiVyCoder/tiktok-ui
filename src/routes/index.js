// Layouts
import { HeaderOnly } from '~/layouts';
import config from '~/config';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';
import Profile from '~/pages/Profile';
//  public routes
export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.nickname, component: Profile }, // nickname là partent nghĩa là phần ko cố định có thể thay đổi
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
];
export const privateRoutes = [];
