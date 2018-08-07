all:
	@echo "Hello $(LOGNAME), nothing to do by default"
	@echo "Try 'make help'"

help:
	@echo "for create app use 'make create' command"

create:
	@read -p "Enter app name:" app; \
	app_dir=./app/$$app; \
	mkdir -p app/$$app; \
	touch $$app_dir/models.js; \
	touch $$app_dir/routes.js; \
	touch $$app_dir/test.js; \
	echo "you're app created at $$app_dir"
