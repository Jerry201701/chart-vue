/* 
 * 接口统一集成模块
 */
import * as login from './moudules/login'
import * as user from './moudules/user'
import * as role from './moudules/role'
import * as menu from './moudules/menu'
import * as dict from './moudules/dict'
import * as log from './moudules/log'
import * as uploadPicture from './moudules/uploadPicture'
import * as nav from './moudules/nav'
import * as settling from './moudules/settling'
import * as elite from './moudules/elite'


// 默认全部导出
export default {
    login,
    user,
    role,
    menu,
    dict,
    log,
    uploadPicture,
    nav,
    settling,
    elite

}