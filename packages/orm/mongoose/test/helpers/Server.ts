import {Configuration, Inject, PlatformApplication} from "@tsed/common";
import "@tsed/mongoose";
import "@tsed/platform-express";
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import filedirname from "filedirname";
import methodOverride from "method-override";

// FIXME remove when esm is ready
const [, rootDir] = filedirname();

@Configuration({
  rootDir,
  port: 8001,
  disableComponentScan: true,
  httpsPort: false,
  logger: {
    level: "info",
    logRequest: true
  }
})
export class Server {
  @Inject()
  app: PlatformApplication;

  public $beforeRoutesInit(): void {
    this.app
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      )
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride());
  }
}
