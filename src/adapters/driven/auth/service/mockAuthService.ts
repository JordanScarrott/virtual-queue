import { User } from "../../../../core/domain/models/user.ts";
import { AuthService } from "./authService.ts";

export class MockAuthService implements AuthService {
    users: User[];

    constructor(users: User[]) {
        this.users = users;
    }

    signOrLogIn(): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    signOut(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
