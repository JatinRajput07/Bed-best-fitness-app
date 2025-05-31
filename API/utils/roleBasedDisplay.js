exports.getRoleBasedDisplay = (role) => {

    console.log(role);
    const roleDisplayMap = {
      user: 'Client',
      host: 'Healthbuddy',
    };
    
    console.log(roleDisplayMap[role]);

    return roleDisplayMap[role] || role;
  };