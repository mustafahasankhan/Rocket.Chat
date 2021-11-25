import { Permissions } from '../../../app/models/server/raw';
import { addMigration } from '../../lib/migrations';

const roleName = 'user';

addMigration({
	version: 223,
	up() {
		return Permissions.update(
			{ _id: 'message-impersonate' },
			{ $addToSet: { roles: roleName } },
		);
	},
});
