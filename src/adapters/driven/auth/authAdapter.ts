import { User } from "../../../core/domain/models/user.ts";
import { AuthPort } from "../../../core/ports/authPort.ts";
import { AuthService } from "./service/authService.ts";
import { MockAuthService } from "./service/mockAuthService.ts";

export class AuthAdapter implements AuthPort {
    authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    async signOrLogIn(): Promise<User | null> {
        return await this.authService.signOrLogIn();
    }

    async signOut(): Promise<void> {
        return await this.authService.signOut();
    }
}
