import Auth from '../model/auth.model';
import UserDocument from '../interface/auth.interface';
import HttpException from '../utils/http.exception';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthService {
    private User = Auth;

    public async registerUser(
        email: string,
        password: string
    ): Promise<{
        user: UserDocument | null;
        token: string | null;
    }> {
        try {
            const dup = await this.User.findOne({ email: email });
            if (dup) {
                throw new HttpException(409, 'Email already registered');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this.User.create({
                email,
                password: hashedPassword,
                roles: ['user'],
            });
            const token = jwt.sign({ user }, 'your-secret-key', {
                expiresIn: '30d',
            });
            return { user, token };
        } catch (err) {
            throw err;
        }
    }

    public async loginUser(
        email: string,
        password: string
    ): Promise<{
        user: UserDocument | null;
        token: string | null;
    }> {
        try {
            const user = await this.User.findOne({ email: email });
            if (!user) {
                throw new HttpException(
                    409,
                    'User with the given email does not exist'
                );
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new HttpException(401, 'Invalid Credentials');
            }
            const token = jwt.sign({ user }, 'your-secret-key', {
                expiresIn: '30d',
            });
            return { user, token };
        } catch (err) {
            throw err;
        }
    }

    public async verifyUser(user: UserDocument): Promise<any> {
        try {
            if (user) {
                const userModel = await this.User.findOne({
                    _id: user?._id,
                });

                return userModel;
            }
            throw new HttpException(401, 'Please register yourself');
        } catch (err) {
            throw err;
        }
    }
}

export default AuthService;
