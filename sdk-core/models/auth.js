import createModel from './base';

const AuthModel = createModel({
    accessToken: { key: 'access_token', type: 'string' },
    accessTokenExpiresAt: { key: 'access_token_expires_at', type: 'string' },
    refreshToken: { key: 'refresh_token', type: 'string' },
    refreshTokenExpiresAt: { key: 'refresh_token_expires_at', type: 'string' },
    customerId: { key: 'customer_id', type: 'string' },
    username: { key: 'username', type: 'string' },
});

const Auth = ({ data }) => new AuthModel(data);

export { Auth };
