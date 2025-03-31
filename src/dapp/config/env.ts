const config_env = {
    infuraUrl: import.meta.env.VITE_INFURA_API_URL as string,
    fleekClientId: import.meta.env.VITE_IPFS_FLEEK_clientId as string,
    isDev: import.meta.env.DEV,
    // 其他环境变量...
};

export default config_env;