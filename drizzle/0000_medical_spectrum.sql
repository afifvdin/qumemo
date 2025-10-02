CREATE TABLE "sessions" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"access_token" text NOT NULL,
	"expires_in" integer NOT NULL,
	"scope" varchar(255) NOT NULL,
	"tokenType" varchar(255) NOT NULL
);
