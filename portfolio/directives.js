// exports.addToPortfolio = function() {
//   return {
//     controller: 'AddToPortfolioController',
//     templateUrl: '/portfolio/templates/add_to_portfolio.html'
//   };
// };


exports.navBar = function() {
  return {
    controller: 'NavBarController',
    templateUrl: '/portfolio/templates/nav_bar.html'
  };
};

exports.projectDetails = function() {
  return {
    controller: 'ProjectDetailsController',
    templateUrl: '/portfolio/templates/project_details.html'
  };
};

exports.anyTool = function() {
  return {
    controller: 'AnyToolController',
    templateUrl: '/portfolio/templates/any_tool.html'
  }
};

exports.toolProjects = function() {
  return {
    controller: 'ToolProjectsController',
    templateUrl: '/portfolio/templates/tool_projects.html'
  }
};
