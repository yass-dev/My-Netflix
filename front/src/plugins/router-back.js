export default {

	install(app, options)
	{
		app.mixin(
		{
			data()
			{
				return {
					fromRoute: null
				}
			},

			beforeRouteEnter (to, from, next)
			{
				next(vm => {
					vm.fromRoute = from;
				})
			},
		
			methods:
			{
				handleBack (fallback)
				{
					if (!this.fromRoute)
						this.$router.push(fallback);
					else
						this.$router.back();
				}
			}
		});
	}
};