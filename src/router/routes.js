import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Typography from "@/pages/Typography.vue";
import KeywordList from "@/pages/KeywordList.vue";
import NeList from "@/pages/NeList.vue";
import CompanyList from "@/pages/CompanyList.vue";
import DatasetAdd from "@/pages/DatasetAdd.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "导航面板",
        component: Dashboard
      },
      {
        path: "company_list",
        name: "公司列表",
        component: CompanyList
      },
      {
        path: "keyword_list",
        name: "关键词库",
        component: KeywordList
      },
	  {
	    path: "ne_list",
	    name: "NER",
	    component: NeList
	  },
	  
	  // {
	  //   path: "dataset-add",
	  //   name: "关系数据",	
	  //   component: DatasetAdd
    // },
    
	  
    {
      path: "notifications",
      name: "notifications",
      component: Notifications
    },
    {
      path: "icons",
      name: "icons",
      component: Icons
    },
    {
      path: "typography",
      name: "typography",
      component: Typography
    }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
