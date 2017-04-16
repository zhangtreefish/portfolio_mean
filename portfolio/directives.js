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

exports.customFooter = function() {
  return {
    controller: 'CustomFooterController',
    templateUrl: '/portfolio/templates/custom_footer.html'
  }
};

exports.projectDetails = function() {
  return {
    controller: 'ProjectDetailsController',
    templateUrl: '/portfolio/templates/project_details.html'
  };
};

exports.userDetails = function() {
  return {
    controller: 'UserDetailsController',
    templateUrl: '/portfolio/templates/user_details.html'
  };
};

exports.projectsByTool = function() {
  return {
    controller: 'ProjectsByToolController',
    templateUrl: '/portfolio/templates/projects_by_tool.html'
  }
};

exports.projects = function() {
  return {
    controller: 'ProjectsController',
    templateUrl: '/portfolio/templates/projects.html'
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

exports.me = function() {
  return {
    controller: 'MeController',
    templateUrl: '/portfolio/templates/me.html'
  }
};

exports.users = function() {
  return {
    controller: 'UsersController',
    templateUrl: '/portfolio/templates/users.html'
  }
}
