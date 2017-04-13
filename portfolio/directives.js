exports.addToPortfolio = function() {
  return {
    controller: 'AddToPortfolioController',
    templateUrl: '/portfolio/templates/add_to_portfolio.html'
  };
};

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

exports.projectsByTool = function() {
  return {
    controller: 'ProjectsByToolController',
    templateUrl: '/portfolio/templates/projects_by_tool.html'
  }
};

exports.anyToolTwo = function() {
  return {
    controller: 'AnyToolTwoController',
    templateUrl: '/portfolio/templates/any_tool_two.html'
  }
};
exports.toolProjectsTwo = function() {
  return {
    controller: 'ToolProjectsTwoController',
    templateUrl: '/portfolio/templates/tool_projects_two.html'
  }
};
