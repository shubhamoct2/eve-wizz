import CoreApi from "@/lib/core/api.core";
import ENDPOINTS from "@/lib/core/endpoints";
import {
	showErrors
} from "@/lib/utils"
const API_ENDPOINTS = ENDPOINTS;
import {
	toast
} from "@/components/ui/use-toast"

export type ResponseType = {
	status: boolean
	data: [] | {} | null
	errors: null | [] | {}
	message ? : string
	code ? : string | number
}

export type LoginInputType = {
	email: string;
	password: string;
	remember ? : string
};
export type RegisterUserInputType = {
	name ? : string;
	email: string;
	password: string;
};
export type ChangePasswordInputType = {
	oldPassword: string;
	newPassword: string;
};
export type ForgetPasswordInputType = {
	email: string;
};
export type ResetPasswordInputType = {
	email: string;
	token: string;
	password: string;
};
export type VerifyPasswordInputType = {
	email: string;
	token: string;
};
export type SocialLoginInputType = {
	provider: string;
	access_token: string;
};

class Auth extends CoreApi {
	constructor(url: string | null) {
		super(url);
	}

	async login(credentials: LoginInputType) {
		await this.csrf()
		try {
			return await this.http.post(API_ENDPOINTS.LOGIN, credentials)
                .then((loginResponse) => {
					console.log('loginResponse###', loginResponse)
				})
				.catch(error => {
					console.log(error, ' errorerrorerror')
					return error
				})
		} catch (error) {
			console.log(error, ' errorerrorerror')
        }

    }

    async register(credentials: RegisterUserInputType) {
        await this.csrf()
        return await
        this
            .http
            .post(API_ENDPOINTS.REGISTER, credentials)
            .then((registerResponse) => {
                if (registerResponse?.data?.status) {
                    return registerResponse?.data
                } else {
                    showErrors(registerResponse.data.errors);
                    return false
                }
            }).catch(error => {
                return error
            })


    }

    async logout() {
        return this
            .http
            .post(ENDPOINTS.LOGOUT);
    }

    async changePassword(input: ChangePasswordInputType) {
        return this
            .http
            .post(API_ENDPOINTS.CHANGE_PASSWORD, input)
            .then((res) => res.data);
    }

    async forgetPassword(input: ForgetPasswordInputType) {
        return this
            .http
            .post(API_ENDPOINTS.FORGET_PASSWORD, input)
            .then((res) => res.data);
    }

    async resetPassword(input: ResetPasswordInputType) {
        return this
            .http
            .post(API_ENDPOINTS.RESET_PASSWORD, input)
            .then((res) => res.data);
    }

    async verifyForgetPassword(input: VerifyPasswordInputType) {
        return this
            .http
            .post(API_ENDPOINTS.VERIFY_FORGET_PASSWORD, input)
            .then((res) => res.data);
    }

    async csrf() {
        await this.http.get(ENDPOINTS.TOKEN)
    }
}

export const AuthService = new Auth("auth");
