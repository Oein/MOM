import type { NextPage } from "next";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import iPhones from "../src/iPhones";

interface IconPair {
  startX: number;
  startY: number;
}

const Home: NextPage = () => {
  let [emptySS, setess] = useState(true);
  let [emptys, setEemptys] = useState<IconPair[]>([]);
  let [screenShotURL, sshurl] = useState<string>("");
  let screen_width: number;
  let screen_height: number;
  let screen_rwidth: number;
  let screen_rheight: number;
  let screen_ratio: number;
  let iconSize: number;
  let iconTemplate: string;
  let mobileConfigTemplate: string;

  /** Set variables  */
  useEffect(() => {
    screen_width = window.screen.width;
    screen_height = window.screen.height;
    screen_rwidth = window.screen.width * window.devicePixelRatio;
    screen_rheight = window.screen.height * window.devicePixelRatio;
    screen_ratio = window.devicePixelRatio;
    iconSize = 100;
    iconTemplate = `<dict>
    <key>FullScreen</key>
    <true/>
    <key>Icon</key>
    <data>
    $0
    </data>
    <key>IgnoreManifestScope</key>
    <false/>
    <key>IsRemovable</key>
    <true/>
    <key>Label</key>
    <string> </string>
    <key>PayloadDescription</key>
    <string>Web Clip 설정 구성</string>
    <key>PayloadDisplayName</key>
    <string>Web Clip</string>
    <key>PayloadIdentifier</key>
    <string>com.apple.webClip.managed.$1</string>
    <key>PayloadType</key>
    <string>com.apple.webClip.managed</string>
    <key>PayloadUUID</key>
    <string>$1</string>
    <key>PayloadVersion</key>
    <integer>$2</integer>
    <key>Precomposed</key>
    <true/>
    <key>URL</key>
    <string>data:text/html, &lt;html&gt;&lt;body&gt;&lt;script&gt;this.window.close()&lt;/script&gt;&lt;/body&gt;&lt;/html&gt;</string>
    </dict>`;
    mobileConfigTemplate = `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
      <key>ConsentText</key>
      <dict/>
      <key>PayloadContent</key>
      <array>
        $icons
      </array>
      <key>PayloadDescription</key>
      <string>This profile is used for make empty icons on your home screen</string>
      <key>PayloadDisplayName</key>
      <string>Oein's Empty Icons</string>
      <key>PayloadIdentifier</key>
      <string>com.oein.emptyIcons.111111111111</string>
      <key>PayloadOrganization</key>
      <string>oein</string>
      <key>PayloadRemovalDisallowed</key>
      <false/>
      <key>PayloadType</key>
      <string>Configuration</string>
      <key>PayloadUUID</key>
      <string>CB1D1B7B-BC7C-4DFD-83A7-D0DD35575B2E</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
    </dict>
    </plist>`;

    console.log(`screen width : ${screen_width}`);
    console.log(`screen height : ${screen_height}`);
    console.log(`screen ratio : ${screen_ratio}`);
    console.log(
      `(${screen_width} x ${screen_height}) x ${screen_ratio} = (${
        screen_width * screen_ratio
      } x ${screen_height * screen_ratio})`
    );

    is_iOS = () => {
      var ua = window.navigator.userAgent;
      var iOS = !!ua.match(/iPhone/i);
      var webkitUa = !!ua.match(/WebKit/i);

      return typeof webkitUa !== "undefined" && iOS && webkitUa;
    };
  });

  let is_iOS = () => {
    return false;
  };

  const is_Safari = () => {
    let ua = navigator.userAgent;
    let notSafaris = [/CriOS/i, /FxiOS/i, /OPiOS/i, /mercury/i];
    let isSafari = true;
    notSafaris.map((v) => {
      if (ua.match(v)) isSafari = false;
    });
    return isSafari;
  };

  const is_iOS_and_Safari = () => {
    return is_iOS() && is_Safari();
  };

  const pad2 = (n: number) => {
    return (n < 10 ? "0" : "") + n.toString();
  };

  const download = (filename: string, text: string) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:application/x-apple-aspen-config," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const getImageBlobURLinCanvas = (
    stX: number,
    stY: number,
    width: number,
    height: number
  ) => {
    return new Promise<string>((resolve, reject) => {
      let nC = document.createElement("canvas");
      nC.width = width;
      nC.height = height;
      nC.id = "getImageBlobURLinCanvas.COPY_CANVAS";

      var img = new Image();
      img.onload = () => {
        nC.getContext("2d")?.drawImage(
          img,
          stX,
          stY,
          width,
          height,
          0,
          0,
          width,
          height
        );
        resolve(nC.toDataURL());
        return nC.toDataURL();
      };
      img.src = screenShotURL;
      img.style.display = "none";
      console.log(screenShotURL);
      // img.style.display = "none";
      document.body.appendChild(img);
      document.body.appendChild(nC);
    });
  };

  const get_mobileConfigText = async () => {
    let iarray = "";
    for (let i = 0; i < emptys.length; i++) {
      let empty = emptys[i];
      let url = await getImageBlobURLinCanvas(
        empty.startX,
        empty.startY,
        iconSize,
        iconSize
      );
      iarray += iconTemplate
        .replace("$0", url.replace("data:image/png;base64,", ""))
        .replace("$1", pad2(i))
        .replace("$1", pad2(i))
        .replace("$2", (i + 1).toString());
      iarray += "\n";
    }

    return mobileConfigTemplate.replace("$icons", iarray);
  };

  const isScreenShotImageHasValidSize = (
    ss_w: number,
    ss_h: number
  ): boolean => {
    return true;
    return ss_w == screen_rwidth && ss_h == screen_rheight;
  };

  const uploadHandler = (input: HTMLInputElement, _this: Event) => {
    let files = Array.from(input.files as FileList);
    let file = files[0];

    console.log(file);

    let oldCanvas = document.getElementById(
      "uploadHandler.CANVAS"
    ) as HTMLCanvasElement;
    let canvas = oldCanvas ? oldCanvas : document.createElement("canvas");
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.id = "uploadHandler.CANVAS";
    canvas.style.width = "100%";
    let canvasArticle = document.getElementById(
      "uploadHandler.CANVASARTICLE"
    ) as HTMLElement;

    if (!oldCanvas) canvasArticle?.appendChild(canvas);

    var reader = new FileReader();
    reader.onload = function (event) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      canvas.width = 0;
      canvas.height = 0;
      var img = new Image();
      img.onload = function () {
        if (!isScreenShotImageHasValidSize(img.width, img.height)) {
          toast(
            `Screenshot Image size is not the same as your screen size.${"  "} (${screen_rwidth} x ${screen_rheight}) != (${
              img.width
            } x ${img.height})`,
            {
              type: "error",
            }
          );
          setess(true);
          return;
        }
        setess(false);

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = (event.target as FileReader).result as string;
      sshurl((event.target as FileReader).result as string);
      console.log(screenShotURL);
    };
    reader.readAsDataURL(file);
  };

  const uploadButtonHandler = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";
    document.body.appendChild(input);
    input.onchange = (_this) => {
      uploadHandler(input, _this);
    };
    input.click();
  };

  return (
    <>
      <header>
        <h1>MOM</h1>
        <desc>Make margin On My home screen</desc>
      </header>
      <article>
        <div>You can make margin on your home screen without jailbreak!</div>
      </article>
      {!is_iOS_and_Safari() ? (
        <article>
          <h3>Sorry, but we ONLY support iPhone on Safari.</h3>
          <div>So you can not use this app.</div>
          <h5>
            If you think it is not correct, please issue on the{" "}
            <a
              style={{
                color: "blue",
              }}
              href="https://github.com/Oein/MOM/issues"
            >
              github repository.
            </a>
          </h5>
        </article>
      ) : null}
      <article>
        <div
          style={{
            width: "max-content",
          }}
        >
          <div>Upload your empty home screen image</div>
          <Button disabled={!is_iOS_and_Safari()} onPress={uploadButtonHandler}>
            Upload
          </Button>
        </div>
      </article>
      <article id="uploadHandler.CANVASARTICLE">
        {emptySS ? "Screenshot is empty" : null}
        <canvas id="uploadHandler.CANVAS" width="0" height="0" />
      </article>
      <article>
        <Button
          disabled={!is_iOS_and_Safari()}
          onPress={async () => {
            let config = await get_mobileConfigText();
            download("iempty.mobileconfig", config);
          }}
          color="success"
        >
          Install profile
        </Button>
      </article>
    </>
  );
};

export default Home;
