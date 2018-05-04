import { Map, List } from 'immutable';

export default function (user, accessPermission, resourceId) {
  let ret = false;

  if (Map.isMap(user)) {
    if (user.hasIn(['profile', 'roles'])) {
      const rolePermissions = user.getIn(['profile', 'roles']).filter(
        role => role.hasIn(['accessPermissions', accessPermission])
      );

      if (List.isList(rolePermissions) && rolePermissions.size) {
        if (resourceId) {
          if (rolePermissions
              .first()
              .getIn(['accessPermissions', accessPermission])
              .includes(resourceId)
          ) {
            ret = true;
          }
        } else {
          if (rolePermissions
              .first()
              .hasIn(['accessPermissions', accessPermission])
          ) {
            ret = true;
          }
        }
      }
    }
  } else {
    if (user && user.profile && user.profile.roles) {
      const rolePermissions = user.profile.roles.filter(
        role => role.accessPermissions[accessPermission]
      );

      if (resourceId) {
        if (rolePermissions && rolePermissions.length) {
          if (rolePermissions[0].accessPermissions[accessPermission].indexOf(resourceId) > -1) {
            ret = true;
          }
        }
      } else {
        if (rolePermissions && rolePermissions.length) {
          if (rolePermissions[0].accessPermissions[accessPermission]) {
            ret = true;
          }
        }
      }
    }
  }

  return ret;
}
