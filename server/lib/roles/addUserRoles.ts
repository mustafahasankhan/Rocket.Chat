import type { IRole, IUser } from '../../../definition/IUser';
import type { IRoom } from '../../../definition/IRoom';
import { Users, Roles } from '../../../app/models/server/raw';
import { validateRoleList } from './validateRoleList';

export const addUserRolesAsync = async (userId: IUser['_id'], roleIds: IRole['_id'][], scope?: IRoom['_id']): Promise<boolean> => {
	if (!userId || !roleIds?.length) {
		return false;
	}

	const user = await Users.findOneById(userId, { projection: { _id: 1 } });
	if (!user) {
		throw new Error('error-invalid-user');
	}

	if (!(await validateRoleList(roleIds))) {
		throw new Error('error-invalid-role');
	}

	await Roles.addUserRoles(userId, roleIds, scope);
	return true;
};

export const addUserRoles = (...args: Parameters<typeof addUserRolesAsync>): boolean => Promise.await(addUserRolesAsync(...args));