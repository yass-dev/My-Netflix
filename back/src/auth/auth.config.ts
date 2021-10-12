export default { 
	passportConfig:
	{     
		defaultStrategy: 'jwt',      
		property: 'user',      
		session: false,
	},
	
	JwtConfig:
	{
		secret: "YassFlix",
		signOptions: { expiresIn: '60s' },
	}
};