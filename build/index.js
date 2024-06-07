var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  return userAgent ? "isbot" in isbotModule && typeof isbotModule.isbot == "function" ? isbotModule.isbot(userAgent) : "default" in isbotModule && typeof isbotModule.default == "function" ? isbotModule.default(userAgent) : !1 : !1;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve2, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve2(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve2, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve2(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

// css-bundle-plugin-ns:@remix-run/css-bundle
var cssBundleHref = "/build/css-bundle-5NYK5P53.css";

// app/root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

// app/app/shared/popups/Confirmation/store/store.ts
import { create } from "zustand";

// app/app/shared/popups/Confirmation/store/data.ts
var confirmationPopupInitial = {
  visible: !1,
  title: "",
  text: null,
  buttons: null
};

// app/app/shared/popups/Confirmation/store/store.ts
var useConfirmationPopup = create(
  (set) => ({
    ...confirmationPopupInitial,
    show: (title, text, buttons) => {
      set({
        visible: !0,
        title,
        text,
        buttons
      });
    },
    hide: () => {
      set({
        visible: !1,
        title: "",
        text: "",
        buttons: null
      });
    }
  })
);

// app/app/shared/popups/Confirmation/view.tsx
import { Group, Modal } from "@mantine/core";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function ConfirmationPopup() {
  let { visible, title, text, buttons, hide } = useConfirmationPopup();
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      centered: !0,
      opened: visible,
      title,
      onClose: hide,
      children: [
        /* @__PURE__ */ jsx2("div", { children: text }),
        /* @__PURE__ */ jsx2(Group, { mt: "xl", children: buttons })
      ]
    }
  );
}

// app/app/shared/popups/index.tsx
import { Fragment, jsx as jsx3 } from "react/jsx-runtime";
function Popups() {
  return /* @__PURE__ */ jsx3(Fragment, { children: /* @__PURE__ */ jsx3(ConfirmationPopup, {}) });
}

// app/app/shared/styles/theme.ts
import { Checkbox, createTheme } from "@mantine/core";

// app/app/shared/styles/components/checkbox.module.css
var checkbox_module_default = { input: "H3pc0" };

// app/app/shared/styles/theme.ts
var nanomolnTheme = createTheme({
  primaryColor: "primary",
  colors: {
    primary: [
      "#C3D4DC",
      "#6e9eb3",
      "#6398af",
      "#52859a",
      "#45768a",
      "#33667a",
      "#1e3c48",
      "#18303a",
      "#12242B",
      "#0c181d",
      "#060c03"
    ],
    dark: [
      "#edf2f4",
      "#2b2b2b",
      "#272625",
      "#24211e",
      "#201c18",
      "#1c1918",
      "#17110d",
      "#120D09",
      "#080604",
      "#000000"
    ]
  },
  components: {
    Checkbox: Checkbox.extend({
      defaultProps: { classNames: checkbox_module_default },
      vars: () => ({ root: { "--checkbox-color": "var(--mantine-color-primary-6)" } })
    })
  }
});

// app/app/shared/ui-kit/GlobalLoader/index.tsx
import { useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

// app/app/shared/ui-kit/GlobalLoader/hooks/useLoadState.ts
import { useCallback, useMemo } from "react";
function useLoadState(lockActions) {
  let lock = useCallback(() => {
    document.documentElement.style.cursor = "wait", lockActions && (document.body.style.pointerEvents = "none");
  }, [lockActions]), unlock = useCallback(() => {
    document.documentElement.style.cursor = "default", document.body.style.pointerEvents = "all";
  }, []);
  return useMemo(() => ({
    lock,
    unlock
  }), [lock, unlock]);
}

// app/app/shared/ui-kit/GlobalLoader/index.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function GlobalLoader() {
  let navigation = useNavigation(), [progress, $progress] = useState(0), loadState = useLoadState(!0);
  return useEffect(() => {
    switch (navigation.state) {
      case "submitting":
        $progress(Math.max(progress, 25));
        return;
      case "loading":
        loadState.lock(), $progress(Math.max(progress, 75));
        return;
      case "idle":
      default:
        loadState.unlock(), $progress((old) => old === 0 ? 0 : 100);
    }
  }, [navigation.state, progress, loadState]), /* @__PURE__ */ jsx4(
    LoadingBar,
    {
      color: progress <= 50 ? "var(--color-red)" : "var(--color-green)",
      progress,
      onLoaderFinished: () => {
        $progress(0);
      }
    }
  );
}

// app/root.tsx
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
function links() {
  return [
    ...cssBundleHref ? [{
      rel: "stylesheet",
      href: cssBundleHref
    }] : []
  ];
}
function App() {
  return (
    // eslint-disable-next-line react/no-unknown-property
    /* @__PURE__ */ jsxs2("html", { "data-mantine-color-scheme": "dark", lang: "en", children: [
      /* @__PURE__ */ jsxs2("head", { children: [
        /* @__PURE__ */ jsx5("meta", { charSet: "utf-8" }),
        /* @__PURE__ */ jsx5("meta", { content: "width=device-width, initial-scale=1", name: "viewport" }),
        /* @__PURE__ */ jsx5(Meta, {}),
        /* @__PURE__ */ jsx5(Links, {}),
        /* @__PURE__ */ jsx5(ColorSchemeScript, { forceColorScheme: "dark" })
      ] }),
      /* @__PURE__ */ jsx5("body", { children: /* @__PURE__ */ jsxs2(MantineProvider, { forceColorScheme: "dark", theme: nanomolnTheme, children: [
        /* @__PURE__ */ jsx5(GlobalLoader, {}),
        /* @__PURE__ */ jsx5(Outlet, {}),
        /* @__PURE__ */ jsx5(ScrollRestoration, {}),
        /* @__PURE__ */ jsx5(Scripts, {}),
        /* @__PURE__ */ jsx5(LiveReload, {}),
        /* @__PURE__ */ jsx5(Popups, {})
      ] }) })
    ] })
  );
}

// app/routes/api.download/route.ts
var route_exports = {};
__export(route_exports, {
  loader: () => loader
});

// app/app/entrypoints/Download/index.ts
import fs4 from "fs";
import { createReadableStreamFromReadable as createReadableStreamFromReadable2 } from "@remix-run/node";

// app/app/entrypoints/Download/consts.ts
var MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
  mp3: "audio/mpeg"
};

// app/app/services/fs/modules/dir.module.ts
var dir_module_exports = {};
__export(dir_module_exports, {
  content: () => content,
  create: () => create2,
  draft: () => draft,
  extend: () => extend,
  extendDeep: () => extendDeep,
  find: () => find,
  read: () => read
});
import fs2 from "fs";

// app/app/services/fs/modules/path.module.ts
var path_module_exports = {};
__export(path_module_exports, {
  getDir: () => getDir,
  info: () => info,
  infoList: () => infoList,
  relative: () => relative,
  resolve: () => resolve,
  stats: () => stats
});
import fs from "fs";
import _path from "path";

// app/app/services/hash/index.ts
import crypto from "crypto";
var HashService = class {
  get(str) {
    return crypto.createHash("sha1").update(str).digest("hex");
  }
}, hashService = new HashService();

// app/app/services/fs/modules/path.module.ts
function getDir(path) {
  return _path.dirname(path);
}
function resolve(dir, file) {
  return _path.resolve(dir, file);
}
function relative(parent, fullpath) {
  return _path.relative(parent, fullpath).replace(/\\/g, "/");
}
function stats(dir, filename) {
  let fullpath = resolve(dir, filename), stats2 = fs.statSync(fullpath);
  return {
    dir,
    filename,
    path: fullpath,
    type: stats2.isDirectory() ? "directory" : "file",
    size: stats2.size
  };
}
function info(path) {
  let { files: files2, folders } = content(path);
  return {
    hash: hashService.get(path),
    relative: "",
    path,
    files: files2,
    folders
  };
}
function infoList(paths) {
  return paths.map((path) => info(path));
}

// app/app/services/fs/modules/dir.module.ts
function read(dir) {
  return fs2.readdirSync(dir);
}
function draft(parent) {
  return {
    type: "directory",
    dir: parent?.path ?? "",
    draft: !0,
    relative: "",
    path: "",
    filename: "",
    size: 0,
    files: [],
    folders: []
  };
}
function create2(dir, name) {
  return fs2.mkdirSync(resolve(dir, name), { recursive: !0 });
}
function find(parent, subfolder) {
  if (!subfolder.includes("/"))
    return parent.folders.find((folder) => folder.relative === subfolder);
  let parts = subfolder.split("/"), subparent = parent.folders.find((folder) => folder.relative === parts[0]);
  if (subparent)
    return find(extendDeep(subparent), parts.slice(1).join("/"));
}
function content(dir) {
  let items = fs2.readdirSync(dir, "utf8").map((filename) => stats(dir, filename)), files2 = items.filter((info2) => info2.type === "file"), folders = items.filter((info2) => info2.type === "directory").map((info2) => extend(dir, info2));
  return {
    files: files2,
    folders
  };
}
function extend(parent, target) {
  let { files: files2, folders } = content(target.path);
  return {
    ...target,
    relative: relative(parent, target.path),
    files: files2,
    folders
  };
}
function extendDeep(parent, topLevel) {
  return {
    ...parent,
    relative: parent.relative ?? "",
    folders: parent.folders.map((folder) => extend(topLevel ?? parent.path, folder))
  };
}

// app/app/services/fs/modules/file.module.ts
var file_module_exports = {};
__export(file_module_exports, {
  getName: () => getName,
  infoFromFile: () => infoFromFile,
  infoFromFiles: () => infoFromFiles,
  move: () => move,
  read: () => read2,
  remove: () => remove,
  rename: () => rename
});
import fs3 from "fs";
function getName(filename) {
  return filename.replace(/[\\]+/g, "/").split("/").pop() ?? filename;
}
function read2(filename) {
  return fs3.readFileSync(resolve(process.cwd(), filename), "utf8");
}
async function rename(path, original, update) {
  await new Promise((resolve2) => {
    let from = `${path}/${original}`, to = `${path}/${update}`;
    fs3.existsSync(from) && fs3.renameSync(from, to), resolve2();
  });
}
async function move(files2, target) {
  await new Promise((resolve2) => {
    fs3.existsSync(target) ? files2.forEach((file) => {
      file !== target && getDir(file) !== target && fs3.existsSync(file) ? fs3.rename(file, resolve(target, getName(file)), (err) => {
        err && console.error("Move error", err);
      }) : console.error(`Error moving file: ${file}`);
    }) : console.error(`Path not found: ${target}`), resolve2();
  });
}
async function remove(list) {
  await new Promise((resolve2) => {
    list.forEach((path) => {
      fs3.rmSync(path, {
        force: !0,
        recursive: !0
      });
    }), resolve2();
  });
}
function infoFromFile(file, parent) {
  return {
    dir: parent,
    filename: file.name,
    path: `${parent}/${file.name}`,
    type: "file",
    size: File.length
  };
}
function infoFromFiles(files2, parent) {
  return files2.map((file) => infoFromFile(file, parent));
}

// app/app/services/fs/service.ts
var fsService = {
  dir: dir_module_exports,
  file: file_module_exports,
  path: path_module_exports
};

// app/app/services/json/index.tsx
var JSONService = class {
  read(path) {
    try {
      return JSON.parse(fsService.file.read(path));
    } catch (e) {
      throw new Error(e);
    }
  }
}, jsonService = new JSONService();

// app/app/services/config/index.ts
var ConfigService = class {
  config;
  constructor() {
    this.config = jsonService.read("./config.json"), console.log("[nanomoln] Config loaded:", this.config);
  }
  get() {
    return this.config;
  }
  getPaths() {
    return this.config.paths;
  }
  getAccept() {
    return this.config.accept || [];
  }
  allow(type) {
    return !!this.config.accept.includes(type);
  }
}, configService = new ConfigService();

// app/app/entrypoints/Download/helpers.ts
function pathIsAllowed(hash) {
  if (!hash)
    return !1;
  let config = configService.get(), { paths } = config;
  return paths.some((top) => hashService.get(top) === hash);
}
function getPathFromHash(hash, file) {
  if (!hash || !file)
    return;
  let config = configService.get(), { paths } = config, top = paths.find((top2) => hashService.get(top2) === hash);
  if (top)
    return `${top}/${file}`.replace(/[/]+/g, "/");
}

// app/app/entrypoints/Download/index.ts
async function loader({ request }) {
  let params = new URLSearchParams(request.url.split("?").pop() ?? ""), file = params.get("file") ?? "", hash = params.get("hash");
  if (!pathIsAllowed(hash))
    return new Response("Access denied", { status: 403 });
  let path = getPathFromHash(hash, file);
  if (!path || !fs4.existsSync(path))
    return new Response("Not found", { status: 404 });
  let content2 = createReadableStreamFromReadable2(fs4.createReadStream(path)), filename = path.split("/").pop() ?? "", mime = MIME_TYPES[filename.split(".").pop()?.toLocaleLowerCase() ?? ""] || MIME_TYPES.default;
  return new Response(content2, {
    headers: {
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": mime
    }
  });
}

// app/routes/view.$path.$/route.ts
var route_exports2 = {};
__export(route_exports2, {
  default: () => route_default,
  loader: () => loader2,
  meta: () => meta
});

// app/app/segments/behavior/RemoveButton/index.tsx
import { ActionIcon } from "@mantine/core";
import { IconTrashFilled } from "@tabler/icons-react";

// app/app/segments/behavior/RemoveButton/hooks/useRemoveConfirmation.tsx
import { Button } from "@mantine/core";
import { useCallback as useCallback6, useMemo as useMemo4 } from "react";

// app/app/services/folder/hooks/useFilesHandlers.ts
import { useCallback as useCallback5, useMemo as useMemo3 } from "react";

// app/app/services/api/index.ts
var ApiService = class {
  async post(url, body) {
    return await (await fetch(url, {
      method: "POST",
      body: JSON.stringify(body)
    })).json();
  }
  async rename(path, original, update) {
    await this.post("/api/folders/rename", {
      path,
      original,
      update
    });
  }
  async createFolder(path, name) {
    await this.post("/api/folders/create", {
      path,
      name
    });
  }
  async getFolders(path, top) {
    return await this.post("/api/folders", {
      path,
      top
    });
  }
  async getFiles(path) {
    return await this.post("/api/folders/files", { path });
  }
  async moveFiles(files2, target) {
    await this.post("/api/folders/move", {
      files: files2,
      target
    });
  }
  async uploadFiles(files2, target) {
    let data = new FormData();
    files2.forEach((file) => {
      data.append("file", file);
    }), await fetch(`/api/folders/upload?target=${encodeURIComponent(target)}`, {
      method: "POST",
      body: data
    });
  }
  async removeFiles(list) {
    await this.post("/api/folders/remove", { list });
  }
}, apiService = new ApiService();

// app/app/shared/lib/utils/object.ts
function getKeys(obj) {
  return Object.keys(obj);
}
function extract(obj, keys) {
  let res = {};
  return keys.forEach((key) => {
    res[key] = obj[key];
  }), res;
}
function extractMap(keys) {
  return (obj) => extract(obj, keys);
}
function exclude(obj, ex) {
  let res = {};
  return getKeys(obj).forEach((key) => {
    ex.includes(key) || (res[key] = obj[key]);
  }), res;
}
function excludeMap(keys) {
  return (obj) => exclude(obj, keys);
}

// app/app/shared/stores/generator.ts
function generateStore(initial, hook) {
  return [
    () => hook(extractMap(getKeys(initial))),
    () => hook(excludeMap(getKeys(initial)))
  ];
}

// app/app/shared/stores/files/data.ts
var filesStoreInitial = {
  top: void 0,
  paths: void 0,
  folder: void 0,
  locked: [],
  temporary: []
};

// app/app/shared/stores/files/store.ts
import { create as create3 } from "zustand";
var useFilesStore = create3(
  (set) => ({
    ...filesStoreInitial,
    lock: (locked) => {
      set({ locked });
    },
    temp: (temporary) => {
      set({ temporary });
    },
    force: (value) => {
      set({
        ...filesStoreInitial,
        ...value
      });
    },
    update: (value) => {
      set({
        ...value,
        temporary: []
      });
    }
  })
);

// app/app/shared/stores/files/index.tsx
var [useFilesStoreData, useFilesStoreActions] = generateStore(filesStoreInitial, useFilesStore);

// app/app/services/folder/hooks/useFolder.ts
import { useMemo as useMemo2 } from "react";

// app/app/services/folder/hooks/useCreateFolder.ts
import { useCallback as useCallback2 } from "react";

// app/app/services/fs/client.service.ts
var fsClientService = { dir: { draft } };

// app/app/services/folder/hooks/helpers.ts
async function getFiles(key, data, topPath) {
  return {
    [key]: {
      ...data,
      folders: await apiService.getFolders(data.path, topPath),
      files: await apiService.getFiles(data.path)
    }
  };
}
async function reloadData(folder, top) {
  return folder ? await getFiles("folder", folder, top?.path ?? folder.path) : top ? await getFiles("top", top, top.path) : {};
}
function hasDraft(target) {
  return !!target?.folders.find((f) => !!f.draft);
}
function isDir(item) {
  return !!item.relative;
}
function addFolder(target, dir) {
  return target && {
    ...target,
    folders: [
      ...target.folders,
      dir
    ]
  };
}
function applyDraft(list, item) {
  return list.map((f) => f.path === item.path ? {
    ...f,
    draft: !0
  } : f);
}
function flushDraft(target) {
  return {
    ...target,
    folders: target.folders.map((f) => ({
      ...f,
      draft: !1
    })),
    files: target.files.map((f) => ({
      ...f,
      draft: !1
    }))
  };
}
function editItem(item, target) {
  return !target || !item ? target : isDir(item) ? {
    ...target,
    folders: applyDraft(target.folders, item)
  } : {
    ...target,
    files: applyDraft(target.files, item)
  };
}
function createFolderIn(folder, top) {
  let draft2 = fsClientService.dir.draft();
  if (folder && !hasDraft(folder))
    return { folder: addFolder(folder, draft2) };
  if (top && !hasDraft(top))
    return { top: addFolder(top, draft2) };
}
function editFolderIn(item, folder, top) {
  if (folder)
    return { folder: editItem(item, flushDraft(folder)) };
  if (top)
    return { top: editItem(item, flushDraft(top)) };
}

// app/app/services/folder/hooks/useCreateFolder.ts
function useCreateFolder() {
  let { folder, top } = useFilesStoreData(), { update } = useFilesStoreActions();
  return useCallback2(
    () => {
      if (update) {
        let payload = createFolderIn(folder, top);
        payload && update(payload);
      }
    },
    [folder, top, update]
  );
}

// app/app/services/folder/hooks/useEditInFolder.ts
import { useCallback as useCallback3 } from "react";
function useEditInFolder() {
  let { folder, top } = useFilesStoreData(), { update } = useFilesStoreActions();
  return useCallback3(
    (item) => {
      if (update) {
        let payload = editFolderIn(item, folder, top);
        payload && update(payload);
      }
    },
    [folder, top, update]
  );
}

// app/app/services/folder/hooks/useReload.ts
import { useCallback as useCallback4 } from "react";
function useReload() {
  let { top, folder } = useFilesStoreData(), { update } = useFilesStoreActions();
  return useCallback4(
    () => {
      update && reloadData(folder, top).then(update);
    },
    [folder, top, update]
  );
}

// app/app/services/folder/hooks/useFolder.ts
function useFolder() {
  let { folder, top, temporary } = useFilesStoreData(), reload = useReload(), create5 = useCreateFolder(), edit = useEditInFolder(), content2 = folder ?? top;
  return {
    data: useMemo2(() => content2 && {
      ...content2,
      files: [
        ...content2.files,
        ...temporary.filter((f) => !content2.files.find((cf) => cf.path !== f.path))
      ].sort((a, b) => b.filename.localeCompare(a.filename))
    }, [temporary, content2]),
    reload,
    create: create5,
    edit
  };
}

// app/app/services/folder/hooks/useFilesHandlers.ts
function useFilesHandlers() {
  let { data, reload } = useFolder(), { lock, temp } = useFilesStoreActions(), rename3 = useCallback5(
    async (item, raw) => {
      let name = raw.split(/(\/|\\)/)[0];
      data && item.draft && (name && name !== item.text && (item.text ? await apiService.rename(data.path, item.text, name) : await apiService.createFolder(data.path, name)), reload?.());
    },
    [data, reload]
  ), move3 = useCallback5(
    async (source, target) => {
      source.includes(target) || (lock(source), await apiService.moveFiles(source, target), reload?.(), lock([]));
    },
    [reload, lock]
  ), upload2 = useCallback5(
    async (files2, target) => {
      let tmp = infoFromFiles(files2, target);
      temp(tmp), lock(tmp.map((f) => f.path)), await apiService.uploadFiles(files2, target), reload?.(), lock([]);
    },
    [lock, temp, reload]
  ), remove3 = useCallback5(
    async (list) => {
      lock(list), await apiService.removeFiles(list), reload?.(), lock([]);
    },
    [lock, reload]
  );
  return useMemo3(
    () => ({
      rename: rename3,
      move: move3,
      upload: upload2,
      remove: remove3
    }),
    [rename3, move3, upload2, remove3]
  );
}

// app/app/segments/behavior/RemoveButton/hooks/useRemoveConfirmation.tsx
import { Fragment as Fragment2, jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
function RemoveConfirmationContent({ list }) {
  let { data: folder } = useFolder(), getRemoveList = useCallback6(
    () => {
      let dirs = list.filter((name) => folder?.folders.find((f) => f.path === name)), files2 = list.filter((name) => folder?.files.find((f) => f.path === name)), res = "";
      return files2.length > 0 && dirs.length > 0 ? res = `${files2.length} ${files2.length === 1 ? "file" : "files"} and ${dirs.length} ${dirs.length === 1 ? "directory" : "directories"}` : files2.length > 0 ? res = files2.length === 1 ? files2[0] : `${files2.length} files` : dirs.length > 0 && (res = dirs.length === 1 ? dirs[0] : `${dirs.length} directories`), res;
    },
    [list, folder]
  );
  return /* @__PURE__ */ jsx6(Fragment2, { children: /* @__PURE__ */ jsxs3("p", { children: [
    "Are you sure to remove ",
    getRemoveList(),
    "?"
  ] }) });
}
function RemoveConfirmationButtons({ list, onRemove }) {
  let { hide } = useConfirmationPopup(), { remove: remove3 } = useFilesHandlers(), handleRemove = useCallback6(
    () => {
      remove3(list), hide(), onRemove?.();
    },
    [list, hide, remove3, onRemove]
  );
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    /* @__PURE__ */ jsx6(Button, { style: { marginRight: "auto" }, variant: "subtle", onClick: hide, children: "Cancel" }),
    /* @__PURE__ */ jsx6(Button, { color: "red", onClick: handleRemove, children: "Remove" })
  ] });
}
function useRemoveConfirmation(files2, onRemove) {
  let { show } = useConfirmationPopup(), confirm = useCallback6(
    () => {
      show(
        "Removing files",
        /* @__PURE__ */ jsx6(RemoveConfirmationContent, { list: files2 }),
        /* @__PURE__ */ jsx6(RemoveConfirmationButtons, { list: files2, onRemove })
      );
    },
    [show, files2, onRemove]
  );
  return useMemo4(() => ({ confirm }), [confirm]);
}

// app/app/segments/behavior/RemoveButton/index.tsx
import { Fragment as Fragment3, jsx as jsx7 } from "react/jsx-runtime";
function RemoveButton({ files: files2, size, onRemove }) {
  let { confirm } = useRemoveConfirmation(files2, onRemove);
  return /* @__PURE__ */ jsx7(Fragment3, { children: /* @__PURE__ */ jsx7(
    ActionIcon,
    {
      color: "red",
      size: size ?? "lg",
      variant: "subtle",
      onClick: confirm,
      children: /* @__PURE__ */ jsx7(IconTrashFilled, { size: 20 })
    }
  ) });
}

// app/app/segments/behavior/SelectionActions/index.tsx
import { Fragment as Fragment4, jsx as jsx8 } from "react/jsx-runtime";
function SelectionActions({ selection }) {
  return !selection || selection.selected.length < 1 ? /* @__PURE__ */ jsx8(Fragment4, {}) : /* @__PURE__ */ jsx8(Fragment4, { children: /* @__PURE__ */ jsx8(RemoveButton, { files: selection.selected, onRemove: selection.reset }) });
}

// app/app/segments/elements/FileRow/cells/FileCellActions.tsx
import { Table } from "@mantine/core";
import cn from "classnames";

// app/app/segments/elements/FileRow/cells/consts.ts
var lastCellWidth = "200px";

// app/app/segments/elements/FileRow/cells/file-cell.module.css
var file_cell_module_default = { faded: "gnp3A", link: "HN-kO", hideOnHover: "_-1MGa", showOnHover: "kxecj", pullRight: "w5N5L", actions: "_70m97", icon: "_3ydyO", fixed: "jrqHC" };

// app/app/segments/elements/FileRow/cells/FileCellActions.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
function FileCellActions({ visible, actions }) {
  return !visible || !actions ? null : /* @__PURE__ */ jsx9(Table.Td, { className: cn(file_cell_module_default.pullRight, file_cell_module_default.showOnHover), w: lastCellWidth, children: /* @__PURE__ */ jsx9("div", { className: file_cell_module_default.actions, children: actions }) });
}

// app/app/segments/elements/FileRow/cells/FileCellContent.tsx
import { Table as Table2 } from "@mantine/core";

// app/app/shared/ui-kit/BlockLink/index.tsx
import { Anchor } from "@mantine/core";
import { Link } from "@remix-run/react";
import cn2 from "classnames";

// app/app/shared/ui-kit/BlockLink/block-link.module.css
var block_link_module_default = { link: "_7dNV8" };

// app/app/shared/ui-kit/BlockLink/index.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
function BlockLink({ to, children, className }) {
  return /* @__PURE__ */ jsx10(
    Anchor,
    {
      c: "primary.1",
      className: cn2(block_link_module_default.link, className),
      component: Link,
      to,
      children: /* @__PURE__ */ jsx10("span", { children })
    }
  );
}

// app/app/shared/ui-kit/EditInput/index.tsx
import { TextInput } from "@mantine/core";
import { useCallback as useCallback7, useState as useState2 } from "react";
import { jsx as jsx11 } from "react/jsx-runtime";
function EditInput({ value, onSave }) {
  let [innerValue, $innerValue] = useState2(value ?? ""), [loading, $loading] = useState2(!1), handleChange = (e) => {
    $innerValue(e.currentTarget.value);
  }, handleKeyPress = (e) => {
    e.key === "Enter" && handleSave();
  }, handleSave = useCallback7(() => {
    $loading(!0), onSave(innerValue);
  }, [innerValue, onSave]);
  return /* @__PURE__ */ jsx11(
    TextInput,
    {
      autoFocus: !0,
      disabled: loading,
      value: innerValue,
      onChange: handleChange,
      onKeyUp: handleKeyPress
    }
  );
}

// app/app/segments/elements/FileRow/cells/FileCellContent.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
function FileCellContent({ visible, draft: draft2, text, link, onSave }) {
  return visible ? /* @__PURE__ */ jsx12(Table2.Td, { maw: "100%", children: draft2 && onSave ? /* @__PURE__ */ jsx12(EditInput, { value: text, onSave }) : link ? /* @__PURE__ */ jsx12(BlockLink, { className: file_cell_module_default.link, to: link, children: text }) : /* @__PURE__ */ jsx12("div", { className: file_cell_module_default.file, children: text }) }) : null;
}

// app/app/segments/elements/FileRow/cells/FileCellIcon.tsx
import { Table as Table3, Center } from "@mantine/core";
import cn3 from "classnames";
import { jsx as jsx13 } from "react/jsx-runtime";
function FileCellIcon({ visible, icon }) {
  return visible ? /* @__PURE__ */ jsx13(Table3.Td, { className: cn3(file_cell_module_default.icon, file_cell_module_default.faded), w: "40px", children: /* @__PURE__ */ jsx13(Center, { children: icon }) }) : null;
}

// app/app/segments/elements/FileRow/cells/FileCellInfo.tsx
import { Table as Table4 } from "@mantine/core";
import cn4 from "classnames";
import { jsx as jsx14 } from "react/jsx-runtime";
function FileCellInfo({ visible, info: info2, actions }) {
  return visible ? /* @__PURE__ */ jsx14(Table4.Td, { className: cn4(file_cell_module_default.faded, actions && file_cell_module_default.hideOnHover), w: lastCellWidth, children: info2 }) : null;
}

// app/app/segments/elements/FileRow/cells/FileCellSelect.tsx
import { Table as Table5, Checkbox as Checkbox2 } from "@mantine/core";
import { useCallback as useCallback8 } from "react";
import { jsx as jsx15 } from "react/jsx-runtime";
function FileCellSelect({ visible, checked, onToggle }) {
  let handleToggle = useCallback8(
    (e) => {
      onToggle?.(e.currentTarget.checked);
    },
    [onToggle]
  );
  return visible ? /* @__PURE__ */ jsx15(Table5.Td, { className: file_cell_module_default.fixed, w: "40px", children: /* @__PURE__ */ jsx15(Checkbox2, { checked, onChange: handleToggle }) }) : null;
}

// app/app/segments/elements/FileRow/index.tsx
import { Fragment as Fragment5, jsx as jsx16, jsxs as jsxs4 } from "react/jsx-runtime";
function FileRow({ item, checked, onToggle, onSave }) {
  return /* @__PURE__ */ jsxs4(Fragment5, { children: [
    /* @__PURE__ */ jsx16(
      FileCellSelect,
      {
        checked,
        visible: item.selectable,
        onToggle
      }
    ),
    /* @__PURE__ */ jsx16(FileCellIcon, { visible: item.showIcon, ...item }),
    /* @__PURE__ */ jsx16(
      FileCellContent,
      {
        visible: !0,
        ...item,
        onSave
      }
    ),
    /* @__PURE__ */ jsx16(FileCellInfo, { visible: !item.draft, ...item, actions: !!item.actions }),
    /* @__PURE__ */ jsx16(FileCellActions, { visible: !item.draft, ...item })
  ] });
}

// app/app/shared/ui-kit/List/index.tsx
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// app/app/shared/ui-kit/List/hooks/useListConfig.ts
function useListConfig(initialConfig) {
  let { selectable, draggable, locked } = initialConfig ?? {}, showIcons = initialConfig?.showIcons === void 0 ? !0 : initialConfig.showIcons;
  return {
    draggable: !!draggable,
    selectable: !!selectable,
    locked: locked ?? [],
    showIcons
  };
}

// app/app/shared/ui-kit/List/hooks/useListHandlers.ts
import { useCallback as useCallback9 } from "react";
function useListHandlers(data, selection, onChange, onDrop) {
  let { isSelected, onSelect } = selection ?? {}, handleSelect = useCallback9(
    (path) => () => {
      path && onSelect?.(path);
    },
    [onSelect]
  ), handleSelectAll = useCallback9(
    () => {
      onSelect?.(data.filter((item) => !!item.path).map((item) => item.path ?? ""));
    },
    [onSelect, data]
  ), handleChange = useCallback9(
    (item) => (name) => {
      onChange?.(item, name);
    },
    [onChange]
  ), handleDrop = useCallback9(
    (source, target) => {
      onDrop?.(source, target);
    },
    [onDrop]
  );
  return {
    change: handleChange,
    drop: handleDrop,
    isSelected,
    select: handleSelect,
    selectAll: handleSelectAll
  };
}

// app/app/shared/ui-kit/List/view/index.tsx
import { Loader, ScrollArea, Table as Table8 } from "@mantine/core";

// app/app/shared/ui-kit/List/view/ListItem/draggable.tsx
import { Table as Table6 } from "@mantine/core";
import cn5 from "classnames";

// app/app/shared/ui-kit/List/hooks/useDnDList.ts
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
function asPaths(list) {
  return list.map((path) => ({ path }));
}
function useDnDList(type, data, selection, onDrop) {
  let ref = useRef(null), [{ isDragging }, drag] = useDrag(
    () => ({
      type,
      item: () => selection?.selected && selection?.selected?.length > 0 ? asPaths(selection.selected) : [data],
      canDrag: () => !!data.drag,
      collect: (monitor) => ({ isDragging: !!monitor.isDragging() })
    }),
    [selection]
  ), [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: type,
      canDrop: (items) => !!data.drop && !items.find((item) => item.path === data.path),
      drop: (items) => {
        data.path && onDrop?.(items.map((item) => item.path ?? ""), data.path);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      })
    })
  );
  return drop(drag(ref)), {
    ref,
    isDragging,
    isOver: canDrop && isOver
  };
}

// app/app/shared/ui-kit/List/utils.ts
function extractDnDData(item) {
  return {
    path: item.path,
    drag: !item.draft,
    drop: item.acceptDrop
  };
}

// app/app/shared/ui-kit/List/view/ListItem/list-item.module.css
var list_item_module_default = { drag: "hYjIl", drop: "VSAdj", locked: "uCQKv" };

// app/app/shared/ui-kit/List/view/ListItem/draggable.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
function DraggableListItem({ selection, onDrop, ...props }) {
  let { item } = props, { ref, isDragging, isOver } = useDnDList("file", extractDnDData(item), selection, onDrop), Component = props.component;
  return /* @__PURE__ */ jsx17(Table6.Tr, { ref, className: cn5(props.locked && list_item_module_default.locked, isDragging && list_item_module_default.drag, isOver && list_item_module_default.drop), children: /* @__PURE__ */ jsx17(Component, { ...props }) });
}

// app/app/shared/ui-kit/List/view/ListItem/static.tsx
import { Table as Table7 } from "@mantine/core";
import cn6 from "classnames";
import { jsx as jsx18 } from "react/jsx-runtime";
function StaticListItem(props) {
  let Component = props.component;
  return /* @__PURE__ */ jsx18(
    Table7.Tr,
    {
      className: cn6(props.locked && list_item_module_default.locked),
      style: {
        userDrag: "none",
        WebkitUserDrag: "none"
      },
      children: /* @__PURE__ */ jsx18(Component, { ...props })
    }
  );
}

// app/app/shared/ui-kit/List/view/ListItem/index.tsx
import { jsx as jsx19 } from "react/jsx-runtime";
function ListItem({ draggable, ...props }) {
  return draggable ? /* @__PURE__ */ jsx19(DraggableListItem, { ...props }) : /* @__PURE__ */ jsx19(StaticListItem, { ...props });
}

// app/app/shared/ui-kit/List/view/list.module.css
var list_module_default = { table: "u7447", thead: "VgQ3Y", tr: "WpJ8d", td: "wRrzH", th: "y7gsS" };

// app/app/shared/ui-kit/List/view/index.tsx
import { jsx as jsx20, jsxs as jsxs5 } from "react/jsx-runtime";
function ListView({ data, selection, component, config, children, handlers }) {
  let { selectable, draggable, locked } = config ?? {}, showIcons = config?.showIcons === void 0 ? !0 : config.showIcons;
  return /* @__PURE__ */ jsx20(ScrollArea, { children: /* @__PURE__ */ jsxs5(
    Table8,
    {
      highlightOnHover: !0,
      classNames: list_module_default,
      horizontalSpacing: "0",
      miw: 800,
      verticalSpacing: "sm",
      children: [
        children,
        /* @__PURE__ */ jsx20(Table8.Tbody, { children: data.map(
          ({ key, ...props }) => /* @__PURE__ */ jsx20(
            ListItem,
            {
              checked: handlers.isSelected?.(key),
              component,
              draggable,
              locked: locked?.includes(props.path ?? ""),
              selection,
              item: {
                ...props,
                icon: !props.icon && locked?.includes(props.path ?? "") ? /* @__PURE__ */ jsx20(Loader, { color: "gray", size: "xs" }) : props.icon,
                selectable,
                showIcon: showIcons
              },
              onDrop: handlers.drop,
              onToggle: handlers.select?.(props.path),
              onSave: handlers.change({
                key,
                ...props
              })
            },
            key
          )
        ) })
      ]
    }
  ) });
}

// app/app/shared/ui-kit/List/view/ListHeader/index.tsx
import { Table as Table9, Checkbox as Checkbox3 } from "@mantine/core";
import cn7 from "classnames";

// app/app/shared/ui-kit/List/view/ListHeader/list-header.module.css
var list_header_module_default = { container: "OyLcf", selected: "BcIMD", actions: "_7OG-U" };

// app/app/shared/ui-kit/List/view/ListHeader/index.tsx
import { Fragment as Fragment6, jsx as jsx21, jsxs as jsxs6 } from "react/jsx-runtime";
function ListHeader({ selected, selection, total, selectionActions, onSelectAll }) {
  return /* @__PURE__ */ jsx21(Table9.Thead, { children: /* @__PURE__ */ jsxs6(Table9.Tr, { children: [
    /* @__PURE__ */ jsx21(Table9.Th, { w: "40px", children: /* @__PURE__ */ jsx21(
      Checkbox3,
      {
        checked: selected && selection.length === total,
        indeterminate: selected && selection.length !== total,
        onChange: onSelectAll
      }
    ) }),
    /* @__PURE__ */ jsx21(Table9.Th, { colSpan: 5, children: /* @__PURE__ */ jsxs6("div", { className: list_header_module_default.container, children: [
      /* @__PURE__ */ jsx21("span", { className: cn7(list_header_module_default.selected, selection && selection.length < 1 && list_header_module_default.empty), children: selected && /* @__PURE__ */ jsxs6(Fragment6, { children: [
        selection.length,
        " selected"
      ] }) }),
      /* @__PURE__ */ jsx21("div", { className: list_header_module_default.actions, children: selectionActions })
    ] }) })
  ] }) });
}

// app/app/shared/ui-kit/List/index.tsx
import { jsx as jsx22 } from "react/jsx-runtime";
function List({ data, component, config, selection, selectionActions, onChange, onDrop }) {
  let viewConfig = useListConfig(config), handlers = useListHandlers(data, selection, onChange, onDrop), { selected, empty } = selection ?? {}, content2 = /* @__PURE__ */ jsx22(
    ListView,
    {
      component,
      config: viewConfig,
      data,
      handlers,
      selection,
      children: selected && /* @__PURE__ */ jsx22(
        ListHeader,
        {
          selected: !empty,
          selection: selected,
          selectionActions,
          total: data.length,
          onSelectAll: handlers.selectAll
        }
      )
    }
  );
  return viewConfig.draggable ? /* @__PURE__ */ jsx22(DndProvider, { backend: HTML5Backend, children: content2 }) : content2;
}

// app/app/segments/appearance/FilesList/hooks/useFilesList.ts
import { useState as useState4, useEffect as useEffect2, useMemo as useMemo6 } from "react";

// app/app/shared/lib/hooks/useSelection.ts
import { useCallback as useCallback10, useMemo as useMemo5, useState as useState3 } from "react";

// app/app/shared/lib/utils/arrays.ts
function filterUnique(item, index, array) {
  return array.indexOf(item) === index;
}

// app/app/shared/lib/hooks/useSelection.ts
function useSelection(initial) {
  let [selected, $selected] = useState3(initial), empty = useMemo5(() => selected.length < 1, [selected]), update = useCallback10(
    (handler) => {
      $selected(handler([...selected]));
    },
    [selected]
  ), exclude2 = useCallback10(
    (value) => {
      update((list) => (list.splice(list.indexOf(value), 1), list));
    },
    [update]
  ), include = useCallback10(
    (value) => {
      update((list) => (list.push(value), list));
    },
    [update]
  ), multiselect = useCallback10(
    (value) => {
      selected.includes(value[0]) ? $selected(selected.filter((item) => !value.includes(item))) : $selected([
        ...selected,
        ...value
      ].filter(filterUnique));
    },
    [selected]
  ), onSelect = useCallback10(
    (value) => {
      Array.isArray(value) ? multiselect(value) : selected.includes(value) ? exclude2(value) : include(value);
    },
    [selected, exclude2, include, multiselect]
  ), isSelected = useCallback10(
    (id) => !!selected?.includes(id),
    [selected]
  ), reset = useCallback10(
    () => {
      $selected([]);
    },
    []
  );
  return useMemo5(
    () => ({
      selected,
      empty,
      onSelect,
      isSelected,
      reset,
      set: $selected
    }),
    [selected, empty, onSelect, isSelected, reset]
  );
}

// app/app/segments/appearance/FilesList/hooks/helpers.tsx
import { IconFolderFilled as IconFolderFilled2, IconFolderUp } from "@tabler/icons-react";

// app/app/segments/behavior/RenameButton/index.tsx
import { ActionIcon as ActionIcon2 } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useCallback as useCallback11 } from "react";
import { Fragment as Fragment7, jsx as jsx23 } from "react/jsx-runtime";
function RenameButton({ item, size }) {
  let { edit } = useFolder(), rename3 = useCallback11(
    () => {
      edit(item);
    },
    [edit, item]
  );
  return /* @__PURE__ */ jsx23(Fragment7, { children: /* @__PURE__ */ jsx23(
    ActionIcon2,
    {
      size: size ?? "lg",
      variant: "subtle",
      onClick: rename3,
      children: /* @__PURE__ */ jsx23(IconPencil, { size: 20 })
    }
  ) });
}

// app/app/segments/behavior/DirActions/index.tsx
import { Fragment as Fragment8, jsx as jsx24, jsxs as jsxs7 } from "react/jsx-runtime";
function DirActions({ dir }) {
  return /* @__PURE__ */ jsxs7(Fragment8, { children: [
    /* @__PURE__ */ jsx24(RenameButton, { item: dir, size: "md" }),
    /* @__PURE__ */ jsx24(RemoveButton, { files: [dir.path], size: "md" })
  ] });
}

// app/app/segments/behavior/DownloadButton/index.tsx
import { ActionIcon as ActionIcon3 } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

// app/app/segments/behavior/DownloadButton/helpers.ts
function getRelative(top, file) {
  return file.path.replace(/[\\]+/g, "/").replace(top.path, "");
}

// app/app/segments/behavior/DownloadButton/index.tsx
import { Fragment as Fragment9, jsx as jsx25 } from "react/jsx-runtime";
function DownloadButton({ file, size }) {
  let { top } = useFilesStoreData();
  return /* @__PURE__ */ jsx25(Fragment9, { children: /* @__PURE__ */ jsx25(
    ActionIcon3,
    {
      size: size ?? "lg",
      variant: "subtle",
      onClick: () => {
        top && window.open(`/api/download?hash=${top.hash}&file=${getRelative(top, file)}`);
      },
      children: /* @__PURE__ */ jsx25(IconDownload, { size: 20 })
    }
  ) });
}

// app/app/segments/behavior/FileActions/index.tsx
import { Fragment as Fragment10, jsx as jsx26, jsxs as jsxs8 } from "react/jsx-runtime";
function FileActions({ file }) {
  return /* @__PURE__ */ jsxs8(Fragment10, { children: [
    /* @__PURE__ */ jsx26(RenameButton, { item: file, size: "md" }),
    /* @__PURE__ */ jsx26(DownloadButton, { file, size: "md" }),
    /* @__PURE__ */ jsx26(RemoveButton, { files: [file.path], size: "md" })
  ] });
}

// app/app/shared/ui-kit/Info/index.tsx
import { jsx as jsx27, jsxs as jsxs9 } from "react/jsx-runtime";
function Info({ prefix, postfix, text, styles }) {
  return /* @__PURE__ */ jsxs9("li", { children: [
    prefix && /* @__PURE__ */ jsx27("span", { className: styles.prefix, children: prefix }),
    /* @__PURE__ */ jsx27("span", { className: styles.text, children: text }),
    postfix && /* @__PURE__ */ jsx27("span", { className: styles.postfix, children: postfix })
  ] });
}

// app/app/shared/ui-kit/InfoList/info-list.module.css
var info_list_module_default = { container: "oPZRi", prefix: "KJqnO", postfix: "tk45f" };

// app/app/shared/ui-kit/InfoList/index.tsx
import { jsx as jsx28 } from "react/jsx-runtime";
var iconSize = 16;
function InfoList({ items }) {
  return /* @__PURE__ */ jsx28("ul", { className: info_list_module_default.container, children: items.map((item) => {
    if (!item)
      return null;
    let Icon = item.icon;
    return /* @__PURE__ */ jsx28(
      Info,
      {
        postfix: Icon && /* @__PURE__ */ jsx28(Icon, { size: iconSize }),
        styles: info_list_module_default,
        text: item.content
      },
      item.key
    );
  }) });
}

// app/app/segments/elements/FileInfo/helpers.tsx
import { filesize } from "filesize";

// app/app/shared/ui-kit/FileType/file-type.module.css
var file_type_module_default = { container: "VZst4" };

// app/app/shared/ui-kit/FileType/index.tsx
import { jsx as jsx29 } from "react/jsx-runtime";
function FileType({ path }) {
  let ext = path.split(".").pop();
  return ext ? /* @__PURE__ */ jsx29("span", { className: file_type_module_default.container, children: ext }) : null;
}

// app/app/segments/elements/FileInfo/helpers.tsx
import { jsx as jsx30 } from "react/jsx-runtime";
function formatItems(data) {
  let res = [];
  return res.push({
    key: "size",
    content: filesize(data.size)
  }), res.push({
    key: "ext",
    content: /* @__PURE__ */ jsx30(FileType, { path: data.filename })
  }), res;
}

// app/app/segments/elements/FileInfo/index.tsx
import { jsx as jsx31 } from "react/jsx-runtime";
function FileInfo({ data }) {
  return /* @__PURE__ */ jsx31(InfoList, { items: formatItems(data) });
}

// app/app/segments/elements/FolderInfo/helpers.ts
import { IconFileFilled, IconFolderFilled } from "@tabler/icons-react";
function formatItems2(data) {
  let res = [];
  return res.push(data.folders.length > 0 && {
    key: "folders",
    icon: IconFolderFilled,
    content: data.folders.length
  }), res.push(data.files.length > 0 && {
    key: "files",
    icon: IconFileFilled,
    content: data.files.length
  }), res;
}

// app/app/segments/elements/FolderInfo/index.tsx
import { jsx as jsx32 } from "react/jsx-runtime";
function FolderInfo({ data }) {
  return /* @__PURE__ */ jsx32(InfoList, { items: formatItems2(data) });
}

// app/app/segments/appearance/FilesList/hooks/helpers.tsx
import { jsx as jsx33 } from "react/jsx-runtime";
function formatFiles(files2) {
  let res = [];
  return files2 && files2.forEach((file) => {
    res.push({
      key: file.path,
      path: file.path,
      text: file.filename,
      draft: file.draft,
      info: /* @__PURE__ */ jsx33(FileInfo, { data: file }),
      actions: /* @__PURE__ */ jsx33(FileActions, { file })
    });
  }), res;
}
function formatFolders(folders, top, parent) {
  let res = [];
  return folders && top && (parent && res.push({
    key: parent,
    path: parent,
    acceptDrop: !0,
    draft: !1,
    text: "..",
    icon: /* @__PURE__ */ jsx33(IconFolderUp, {}),
    link: parent === top.path ? `/view/${top.hash}` : `/view/${top.hash}${parent.replace(/\\/g, "/").replace(top.path, "")}`
  }), folders.forEach((folder) => {
    res.push({
      key: folder.path,
      path: folder.path,
      acceptDrop: !0,
      draft: folder.draft,
      text: folder.filename,
      link: `/view/${top.hash}/${folder.relative}`,
      info: /* @__PURE__ */ jsx33(FolderInfo, { data: folder }),
      icon: /* @__PURE__ */ jsx33(IconFolderFilled2, {}),
      actions: /* @__PURE__ */ jsx33(DirActions, { dir: folder })
    });
  })), res;
}
function joinList(top, data) {
  let res = [], folders = formatFolders(data?.folders, top, data?.hash ? void 0 : data?.dir), files2 = formatFiles(data?.files);
  return folders.length > 0 && res.push(...folders), files2.length > 0 && res.push(...files2), res;
}

// app/app/segments/appearance/FilesList/hooks/useFilesList.ts
function useFilesList() {
  let selection = useSelection([]), { set } = selection, { top } = useFilesStoreData(), { data: folder } = useFolder(), [list, $list] = useState4(joinList(top, folder));
  return useEffect2(() => {
    $list(joinList(top, folder));
  }, [top, folder]), useEffect2(() => {
    set([]);
  }, [folder, set]), useMemo6(
    () => ({
      list,
      selection
    }),
    [list, selection]
  );
}

// app/app/segments/appearance/FilesList/index.tsx
import { jsx as jsx34 } from "react/jsx-runtime";
function FilesList() {
  let { list, selection } = useFilesList(), { locked } = useFilesStoreData(), handlers = useFilesHandlers();
  return /* @__PURE__ */ jsx34(
    List,
    {
      component: FileRow,
      data: list,
      selection,
      selectionActions: /* @__PURE__ */ jsx34(SelectionActions, { selection }),
      config: {
        draggable: !0,
        selectable: !0,
        locked
      },
      onChange: handlers.rename,
      onDrop: handlers.move
    }
  );
}

// app/app/screens/FilesList/index.tsx
import { jsx as jsx35 } from "react/jsx-runtime";
function FilesListScreen() {
  return /* @__PURE__ */ jsx35("div", { children: /* @__PURE__ */ jsx35(FilesList, {}) });
}

// app/app/flows/ViewFiles/index.tsx
import { jsx as jsx36 } from "react/jsx-runtime";
function ViewFilesFlow() {
  let { data } = useFolder();
  return data ? /* @__PURE__ */ jsx36(FilesListScreen, {}) : null;
}

// app/app/segments/appearance/PathList/hooks.ts
import { useState as useState5, useEffect as useEffect3, useMemo as useMemo7 } from "react";

// app/app/segments/appearance/PathList/helpers.tsx
import { jsx as jsx37 } from "react/jsx-runtime";
function formatList(paths) {
  let res = [];
  return paths && paths.forEach((path) => {
    res.push({
      key: path.hash,
      text: `${path.path}`,
      link: `/view/${path.hash}`,
      info: /* @__PURE__ */ jsx37(FolderInfo, { data: path })
    });
  }), res;
}

// app/app/segments/appearance/PathList/hooks.ts
function usePathList() {
  let { paths } = useFilesStoreData(), [list, $list] = useState5(formatList(paths));
  return useEffect3(() => {
    $list(formatList(paths));
  }, [paths]), useMemo7(() => ({ list }), [list]);
}

// app/app/segments/appearance/PathList/index.tsx
import { jsx as jsx38 } from "react/jsx-runtime";
function PathList() {
  let { list } = usePathList();
  return /* @__PURE__ */ jsx38(
    List,
    {
      component: FileRow,
      config: { showIcons: !1 },
      data: list
    }
  );
}

// app/app/screens/PathList/index.tsx
import { jsx as jsx39 } from "react/jsx-runtime";
function PathListScreen() {
  return /* @__PURE__ */ jsx39("div", { children: /* @__PURE__ */ jsx39(PathList, {}) });
}

// app/app/segments/appearance/PageLayout/index.tsx
import { AppShell as AppShell2 } from "@mantine/core";

// app/app/segments/behavior/Breadcrumbs/index.tsx
import { Breadcrumbs as MBreadcrumbs, Anchor as Anchor2 } from "@mantine/core";
import { Link as Link2 } from "@remix-run/react";

// app/app/segments/behavior/Breadcrumbs/Breadcrumbs.module.css
var Breadcrumbs_module_default = { separator: "_7DbBF", breadcrumb: "B4n0u" };

// app/app/segments/behavior/Breadcrumbs/hooks.ts
import { useState as useState6, useEffect as useEffect4, useMemo as useMemo8 } from "react";

// app/app/segments/behavior/Breadcrumbs/consts.ts
var crumbPlaceholder = "...";

// app/app/segments/behavior/Breadcrumbs/helpers.ts
function extractHomeText(parent) {
  return parent?.path.split("/").pop() ?? "";
}
function extractHome(parent) {
  return {
    link: `/view/${parent.hash}`,
    text: extractHomeText(parent) ?? crumbPlaceholder
  };
}
function extractActive(folder, top) {
  return folder?.filename ?? extractHomeText(top) ?? crumbPlaceholder;
}
function extractParents(parent, path) {
  if (!parent || !path)
    return [];
  let res = [], home = extractHome(parent), parts = path.relative.split("/");
  for (let i = 1; i < parts.length; i++)
    res.push({
      link: `${home.link}/${parts.slice(0, i).join("/")}`,
      text: parts[i - 1] ?? crumbPlaceholder
    });
  return [home, ...res];
}

// app/app/segments/behavior/Breadcrumbs/hooks.ts
function useBreadcrumbs() {
  let { folder, top } = useFilesStoreData(), [active, $active] = useState6(extractActive(folder, top)), [path, $path] = useState6(extractParents(top, folder)), visible = useMemo8(() => !!top, [top]);
  return useEffect4(() => {
    $active(extractActive(folder, top)), $path(extractParents(top, folder));
  }, [top, folder]), useMemo8(() => ({
    visible,
    active,
    path
  }), [active, path, visible]);
}

// app/app/segments/behavior/Breadcrumbs/index.tsx
import { jsx as jsx40, jsxs as jsxs10 } from "react/jsx-runtime";
function Breadcrumbs() {
  let { visible, path, active } = useBreadcrumbs();
  return visible ? /* @__PURE__ */ jsxs10(MBreadcrumbs, { classNames: Breadcrumbs_module_default, children: [
    path.map(
      (b) => /* @__PURE__ */ jsx40(Anchor2, { component: Link2, to: b.link, children: b.text }, b.link)
    ),
    /* @__PURE__ */ jsx40(Anchor2, { c: "primary.0", underline: "never", children: active })
  ] }) : null;
}

// app/app/shared/ui-kit/AppHeaderView/index.tsx
import { AppShell, Box, Group as Group2 } from "@mantine/core";

// app/app/shared/ui-kit/AppHeaderView/app-header.module.css
var app_header_module_default = { header: "rJESL" };

// app/app/shared/ui-kit/AppHeaderView/index.tsx
import { jsx as jsx41, jsxs as jsxs11 } from "react/jsx-runtime";
function AppHeaderView({ children, actions }) {
  return /* @__PURE__ */ jsx41(AppShell.Header, { className: app_header_module_default.header, children: /* @__PURE__ */ jsx41(Box, { bg: "primary.8", children: /* @__PURE__ */ jsxs11(Group2, { h: "60px", px: "md", children: [
    children,
    /* @__PURE__ */ jsx41(Group2, { ml: "auto", children: actions })
  ] }) }) });
}

// app/app/shared/ui-kit/LinkLogo/index.tsx
import { Anchor as Anchor3 } from "@mantine/core";
import { Link as Link3 } from "@remix-run/react";

// app/app/shared/ui-kit/Logo/index.tsx
import { jsx as jsx42, jsxs as jsxs12 } from "react/jsx-runtime";
function Logo() {
  return /* @__PURE__ */ jsxs12(
    "svg",
    {
      fill: "none",
      height: "30",
      viewBox: "0 0 1236 861",
      width: "43",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx42(
          "path",
          {
            clipRule: "evenodd",
            d: "M841.7 150.347c58.936-24.994 126.634-30.288 192.71-10.322 149.92 45.303 234.71 203.494 189.38 353.331-33.73 111.498-129.94 186.862-238.681 199.561-57.22 128.709-202.729 197.696-341.115 155.879a285.391 285.391 0 0 1-40.637-15.743c-34.28 13.779-73.388 16.468-111.561 4.933-58.934-17.809-100.926-64.984-114.789-120.654-54.691 19.102-115.716 21.683-175.415 3.643C51.672 675.672-33.117 517.481 12.211 367.644c33.73-111.497 129.936-186.862 238.68-199.561C308.112 39.373 453.62-29.613 592.006 12.204a284.848 284.848 0 0 1 50.417 20.656c27.59-6.295 57.174-5.735 86.155 3.023C785.315 53.028 826.35 97.39 841.7 150.347Z",
            fill: "none",
            fillRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx42(
          "path",
          {
            clipRule: "evenodd",
            d: "M841.7 150.347c58.936-24.994 126.634-30.288 192.71-10.322 149.92 45.303 234.71 203.494 189.38 353.331-33.73 111.498-129.94 186.862-238.681 199.561-57.221 128.709-202.729 197.696-341.115 155.879a285.391 285.391 0 0 1-40.637-15.743c-34.28 13.779-73.388 16.468-111.561 4.933-58.934-17.809-100.926-64.984-114.789-120.654-54.691 19.102-115.716 21.683-175.415 3.643C51.672 675.672-33.117 517.481 12.211 367.644c33.73-111.497 129.936-186.862 238.68-199.561C308.112 39.373 453.62-29.613 592.006 12.204a284.848 284.848 0 0 1 50.417 20.656c27.59-6.295 57.174-5.735 86.154 3.023C785.315 53.028 826.35 97.39 841.7 150.347ZM738.148 292.981l-10.577-19.733-49.502 26.502 56.252 104.95.028-.015 2.655 4.954 105.008-56.22-26.517-49.474-22.836 12.226c41.64-65.635 123.329-98.347 201.398-74.756 93.903 28.374 147.003 127.454 118.613 221.301-22.1 73.069-87.09 121.422-159.108 125.859a236.615 236.615 0 0 1-9.347 48.877 240.002 240.002 0 0 1-3.151 9.67c.501.004-.5 0 0 0-37.874 117.762-161.876 183.892-280.818 147.95-20.299-6.133-39.109-14.848-56.179-25.674-27.119 18.559-62.109 25.111-96.019 14.864-43.114-13.028-72.627-49.631-78.685-91.422-2.285-15.761-1.233-32.26 3.683-48.511a113.666 113.666 0 0 1 1.894-5.712c22.592-17.165 42.218-38.487 57.575-63.267a113.09 113.09 0 0 1 5.829-2.561l8.769 16.361 49.502-26.502-56.252-104.95-.029.015-2.651-4.946-105.009 56.22 26.518 49.474 22.836-12.226c-41.641 65.635-123.329 98.347-201.398 74.756-93.9-28.374-147.005-127.454-118.615-221.301 22.104-73.069 87.095-121.422 159.11-125.859 1.355-16.262 4.431-32.628 9.347-48.877a238.962 238.962 0 0 1 3.15-9.67C330.945 96.642 456.339 29.843 575.754 65.928c21.722 6.563 41.739 16.082 59.743 27.983 23.46-10.085 50.47-12.27 76.828-4.305 42.239 12.764 71.423 48.153 78.287 88.881 2.785 16.523 1.897 33.926-3.284 51.052a114.683 114.683 0 0 1-2.069 6.194 234.335 234.335 0 0 0-46.379 56.8c-.244.15-.488.3-.732.448Z",
            fill: "currentColor",
            fillRule: "evenodd"
          }
        )
      ]
    }
  );
}

// app/app/shared/ui-kit/LinkLogo/index.tsx
import { jsx as jsx43 } from "react/jsx-runtime";
function LinkLogo({ to }) {
  return /* @__PURE__ */ jsx43(
    Anchor3,
    {
      c: "primary.4",
      component: Link3,
      h: "30px",
      lh: "30px",
      to,
      children: /* @__PURE__ */ jsx43(Logo, {})
    }
  );
}

// app/app/segments/appearance/AppHeader/index.tsx
import { jsx as jsx44, jsxs as jsxs13 } from "react/jsx-runtime";
function AppHeader({ actions }) {
  return /* @__PURE__ */ jsxs13(AppHeaderView, { actions, children: [
    /* @__PURE__ */ jsx44(LinkLogo, { to: "/" }),
    /* @__PURE__ */ jsx44(Breadcrumbs, {})
  ] });
}

// app/app/segments/appearance/PageLayout/index.tsx
import { jsx as jsx45, jsxs as jsxs14 } from "react/jsx-runtime";
function PageLayout({ headerActions, children }) {
  return /* @__PURE__ */ jsxs14(AppShell2, { children: [
    /* @__PURE__ */ jsx45(AppHeader, { actions: headerActions }),
    /* @__PURE__ */ jsx45(AppShell2.Main, { children })
  ] });
}

// app/app/segments/behavior/FolderActions/index.tsx
import { ActionIcon as ActionIcon5 } from "@mantine/core";
import { IconFolderFilled as IconFolderFilled3 } from "@tabler/icons-react";
import { useEffect as useEffect5, useState as useState7 } from "react";

// app/app/segments/behavior/Uploader/index.tsx
import { Dropzone } from "@mantine/dropzone";
import { useContext, useRef as useRef2 } from "react";

// app/app/services/config/context.tsx
import { createContext } from "react";
var ConfigContext = createContext(void 0), ConfigProvider = ConfigContext.Provider;

// app/app/segments/behavior/Uploader/components/AcceptContent.tsx
import { rem } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { jsx as jsx46 } from "react/jsx-runtime";
function AcceptContent() {
  return /* @__PURE__ */ jsx46(
    IconUpload,
    {
      stroke: 1.5,
      style: {
        width: rem(52),
        height: rem(52),
        color: "var(--mantine-color-blue-6)"
      }
    }
  );
}

// app/app/segments/behavior/Uploader/components/RejectContent.tsx
import { Group as Group3, Text, rem as rem2 } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { jsx as jsx47, jsxs as jsxs15 } from "react/jsx-runtime";
function RejectContent() {
  return /* @__PURE__ */ jsxs15(
    Group3,
    {
      gap: "xl",
      justify: "center",
      mih: 220,
      style: { pointerEvents: "none" },
      children: [
        /* @__PURE__ */ jsx47(
          IconX,
          {
            stroke: 1.5,
            style: {
              width: rem2(52),
              height: rem2(52),
              color: "var(--mantine-color-red-6)"
            }
          }
        ),
        /* @__PURE__ */ jsx47(Text, { inline: !0, size: "xl", children: "Unsupported file format" })
      ]
    }
  );
}

// app/app/segments/behavior/Uploader/components/UploadIcon.tsx
import { ActionIcon as ActionIcon4 } from "@mantine/core";
import { IconUpload as IconUpload2 } from "@tabler/icons-react";
import { jsx as jsx48 } from "react/jsx-runtime";
function UploadIcon({ onClick }) {
  return /* @__PURE__ */ jsx48(ActionIcon4, { c: "primary.0", size: "lg", onClick, children: /* @__PURE__ */ jsx48(IconUpload2, { size: "20" }) });
}

// app/app/segments/behavior/Uploader/hooks/useSmartUpload.ts
import { useCallback as useCallback13, useMemo as useMemo10 } from "react";

// app/app/segments/behavior/Uploader/helpers.ts
function getFilesIntersection(upload2, check) {
  return upload2.filter((f) => check.find((cf) => cf.filename === f.name));
}

// app/app/segments/behavior/Uploader/hooks/useOverwriteConfirmation.tsx
import { Button as Button2 } from "@mantine/core";
import { useCallback as useCallback12, useMemo as useMemo9 } from "react";
import { Fragment as Fragment11, jsx as jsx49, jsxs as jsxs16 } from "react/jsx-runtime";
function OverwriteContent({ intersection }) {
  return /* @__PURE__ */ jsxs16(Fragment11, { children: [
    /* @__PURE__ */ jsx49("p", { children: "This files will be overwritten:" }),
    /* @__PURE__ */ jsx49("ul", { children: intersection.map((file) => /* @__PURE__ */ jsx49("li", { children: file.name }, file.name)) })
  ] });
}
function OverwriteButtons({ intersection, onOverwrite, onIgnore }) {
  let { hide } = useConfirmationPopup();
  return /* @__PURE__ */ jsxs16(Fragment11, { children: [
    /* @__PURE__ */ jsx49(Button2, { style: { marginRight: "auto" }, variant: "subtle", onClick: hide, children: "Cancel upload" }),
    /* @__PURE__ */ jsx49(Button2, { color: "red", onClick: onOverwrite, children: intersection.length > 1 ? "Overwrite all" : "Overwrite" }),
    intersection.length > 1 && /* @__PURE__ */ jsx49(Button2, { onClick: onIgnore, children: "Ignore exist" })
  ] });
}
function useOverwriteConfirmation() {
  let { show, hide } = useConfirmationPopup(), confirm = useCallback12((intersection, onOverwrite, onIgnore) => {
    intersection && intersection.length > 0 ? show(
      "Files already exist",
      /* @__PURE__ */ jsx49(OverwriteContent, { intersection }),
      /* @__PURE__ */ jsx49(OverwriteButtons, { intersection, onIgnore, onOverwrite })
    ) : console.error("Trying to show empty overwrite confirmation");
  }, [show]);
  return useMemo9(
    () => ({
      confirm,
      hide
    }),
    [confirm, hide]
  );
}

// app/app/segments/behavior/Uploader/hooks/useSmartUpload.ts
function useSmartUpload() {
  let { data: folder } = useFolder(), { upload: upload2 } = useFilesHandlers(), { confirm, hide } = useOverwriteConfirmation(), uploadAll = useCallback13(
    (files2) => () => {
      upload2(files2, folder?.path ?? ""), hide();
    },
    [folder, hide, upload2]
  ), uploadNonExist = useCallback13(
    (files2, intersection) => () => {
      let clean = files2.filter((f) => !intersection.includes(f));
      clean.length > 0 && upload2(clean, folder?.path ?? ""), hide();
    },
    [folder, upload2, hide]
  ), confirmUpload = useCallback13(
    (files2, intersection) => {
      confirm(
        intersection,
        uploadAll(files2),
        uploadNonExist(files2, intersection)
      );
    },
    [confirm, uploadAll, uploadNonExist]
  ), checkOverwrite = useCallback13(
    (files2) => {
      let intersect = getFilesIntersection(files2, folder?.files ?? []);
      intersect.length > 0 ? confirmUpload(files2, intersect) : upload2(files2, folder?.path ?? "");
    },
    [confirmUpload, upload2, folder]
  ), handleUpload = useCallback13(
    (files2) => {
      folder?.path && checkOverwrite(files2);
    },
    [folder, checkOverwrite]
  );
  return useMemo10(() => ({ upload: handleUpload }), [handleUpload]);
}

// app/app/segments/behavior/Uploader/uploader.module.css
var uploader_module_default = { root: "cr9-2" };

// app/app/segments/behavior/Uploader/index.tsx
import { Fragment as Fragment12, jsx as jsx50, jsxs as jsxs17 } from "react/jsx-runtime";
function Uploader() {
  let openRef = useRef2(null), { accept } = useContext(ConfigContext) ?? { accept: ["*"] }, { upload: upload2 } = useSmartUpload();
  return /* @__PURE__ */ jsxs17(Fragment12, { children: [
    /* @__PURE__ */ jsxs17(
      Dropzone.FullScreen,
      {
        active: !0,
        accept,
        className: uploader_module_default.root,
        openRef,
        onDrop: upload2,
        children: [
          /* @__PURE__ */ jsx50(Dropzone.Accept, { children: /* @__PURE__ */ jsx50(AcceptContent, {}) }),
          /* @__PURE__ */ jsx50(Dropzone.Reject, { children: /* @__PURE__ */ jsx50(RejectContent, {}) })
        ]
      }
    ),
    /* @__PURE__ */ jsx50(UploadIcon, { onClick: () => openRef.current?.() })
  ] });
}

// app/app/segments/behavior/FolderActions/index.tsx
import { Fragment as Fragment13, jsx as jsx51, jsxs as jsxs18 } from "react/jsx-runtime";
function FolderActions() {
  let { data, create: create5 } = useFolder(), [visible, $visible] = useState7(!1);
  return useEffect5(() => {
    $visible(!0);
  }, []), !visible || !data ? null : /* @__PURE__ */ jsxs18(Fragment13, { children: [
    /* @__PURE__ */ jsx51(Uploader, {}),
    /* @__PURE__ */ jsx51(ActionIcon5, { c: "primary.0", size: "lg", onClick: create5, children: /* @__PURE__ */ jsx51(IconFolderFilled3, { size: "20" }) })
  ] });
}

// app/app/flows/Main/index.tsx
import { jsx as jsx52 } from "react/jsx-runtime";
function MainFlow() {
  let { data } = useFolder();
  return /* @__PURE__ */ jsx52(
    PageLayout,
    {
      headerActions: /* @__PURE__ */ jsx52(FolderActions, {}),
      children: data ? /* @__PURE__ */ jsx52(ViewFilesFlow, {}) : /* @__PURE__ */ jsx52(PathListScreen, {})
    }
  );
}

// app/app/shared/lib/default-meta.ts
function meta() {
  return [
    { title: "nanomoln" },
    {
      name: "description",
      content: "Simple files manipulation"
    }
  ];
}

// app/app/entrypoints/Folder/hooks.ts
import { useLoaderData } from "@remix-run/react";
import { useEffect as useEffect6, useMemo as useMemo11 } from "react";
function useFolderData() {
  let { data, config } = useLoaderData(), { force } = useFilesStoreActions();
  return useEffect6(() => {
    force(data);
  }, [data, force]), useMemo11(
    () => ({
      config,
      loaded: !!(data.paths && data.top)
    }),
    [data, config]
  );
}

// app/app/services/config/helpers.ts
function withConfig(object) {
  let config = configService.get();
  return {
    ...object,
    config
  };
}

// app/app/entrypoints/Folder/helpers.ts
function getPaths(params) {
  let paths = fsService.path.infoList(configService.getPaths()), target = paths.find((info2) => info2.hash === params.path);
  return {
    paths,
    target
  };
}
async function loadSubfolder(top, paths, subfolder) {
  let res = {
    top,
    paths,
    locked: [],
    temporary: []
  }, sub = fsService.dir.find(top, subfolder);
  return sub && (res.folder = fsService.dir.extendDeep(fsService.dir.extend(top.path, sub), top.path)), res;
}
async function getFolderInfo(paths, target, subfolder) {
  let top = fsService.dir.extendDeep(target);
  return subfolder ? await loadSubfolder(top, paths, subfolder) : {
    top,
    paths,
    locked: [],
    temporary: []
  };
}

// app/app/entrypoints/Folder/loader.ts
async function loader2({ params }) {
  let { paths, target } = getPaths(params);
  return target ? withConfig({ data: await getFolderInfo(paths, target, params["*"]) }) : (console.log("NOT FOUND"), withConfig({
    data: {
      locked: [],
      temporary: []
    }
  }));
}

// app/app/entrypoints/Folder/index.tsx
import { jsx as jsx53 } from "react/jsx-runtime";
function FolderPage() {
  let { loaded, config } = useFolderData();
  return loaded ? /* @__PURE__ */ jsx53(ConfigProvider, { value: config, children: /* @__PURE__ */ jsx53(MainFlow, {}) }) : null;
}

// app/routes/view.$path.$/route.ts
var route_default = FolderPage;

// app/routes/_index/route.ts
var route_exports3 = {};
__export(route_exports3, {
  default: () => route_default2,
  loader: () => loader3,
  meta: () => meta
});

// app/app/entrypoints/Home/hooks.ts
import { useLoaderData as useLoaderData2 } from "@remix-run/react";
import { useEffect as useEffect7, useMemo as useMemo12 } from "react";
function useInitialData() {
  let { data, config } = useLoaderData2(), { force } = useFilesStoreActions();
  return useEffect7(() => {
    force(data);
  }, [data, force]), useMemo12(() => ({ config }), [config]);
}

// app/app/entrypoints/Home/loader.ts
import { redirect } from "@remix-run/node";
async function loader3() {
  let paths = fsService.path.infoList(configService.getPaths());
  return paths.length === 1 ? redirect(`/view/${paths[0].hash}`) : withConfig({ data: { paths } });
}

// app/app/entrypoints/Home/index.tsx
import { jsx as jsx54 } from "react/jsx-runtime";
function HomePage() {
  let { config } = useInitialData();
  return /* @__PURE__ */ jsx54(ConfigProvider, { value: config, children: /* @__PURE__ */ jsx54(MainFlow, {}) });
}

// app/routes/_index/route.ts
var route_default2 = HomePage;

// app/routes/api.$/route.ts
var route_exports4 = {};
__export(route_exports4, {
  action: () => action
});

// app/app/services/error/index.ts
function generateErrorProps(text) {
  return { error: text };
}

// app/app/services/server/generator.ts
function generateServerApi(handlers, defaultHandler) {
  return async ({ action: action2, request, query }) => {
    let payload = request.headers.get("content-type")?.includes("multipart/form-data") ? request : await request.json();
    return !action2 || !handlers[action2] ? defaultHandler(payload, query) : handlers[action2](payload, query);
  };
}

// app/app/services/server/folder/handlers/create.ts
function create4(payload) {
  return fsService.dir.create(payload.path, payload.name);
}

// app/app/services/server/folder/handlers/files.ts
function files(payload) {
  return fsService.dir.content(payload.path).files;
}

// app/app/services/server/folder/handlers/get.ts
function get(payload) {
  return fsService.dir.content(payload.path).folders.map((dir) => fsService.dir.extend(payload.top, dir));
}

// app/app/services/server/folder/handlers/move.ts
function move2(payload) {
  return fsService.file.move(payload.files, payload.target), null;
}

// app/app/services/server/folder/handlers/remove.ts
function remove2(payload) {
  return fsService.file.remove(payload.list), null;
}

// app/app/services/server/folder/handlers/rename.ts
function rename2(payload) {
  return fsService.file.rename(payload.path, payload.original, payload.update), null;
}

// app/app/services/server/folder/handlers/upload.ts
import { unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
async function upload(request, query) {
  let target = query.get("target") ?? void 0, uploadHandler = unstable_composeUploadHandlers(
    async ({ name, contentType, data, filename }) => {
      if (name === "file") {
        if (!configService.allow(contentType))
          return;
        await unstable_createFileUploadHandler({
          directory: target,
          avoidFileConflicts: !1,
          // TODO: Move to config
          maxPartSize: 1e7,
          file: ({ filename: filename2 }) => filename2
        })({
          name,
          contentType,
          data,
          filename
        });
      }
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );
  return await unstable_parseMultipartFormData(
    request,
    uploadHandler
  ), null;
}

// app/app/services/server/folder/index.ts
var folderApi = generateServerApi(
  {
    create: create4,
    move: move2,
    files,
    upload,
    remove: remove2,
    rename: rename2
  },
  get
);

// app/app/services/url/utils.ts
function getApiPath(request) {
  return request.url.split("/api/").pop();
}
function getPathWithoutTopLevel(path) {
  return path.split("/").slice(1).join("/");
}
function getTopLevel(path) {
  return path.split("/").shift();
}

// app/app/entrypoints/Api/action.ts
async function action({ request }) {
  let path = getApiPath(request);
  if (!path)
    return generateErrorProps("No path");
  let topLevel = getTopLevel(path), split = getPathWithoutTopLevel(path).split("?"), action2 = split[0], query = new URLSearchParams(split[1]);
  switch (topLevel?.toLocaleLowerCase()) {
    case "folders":
      return await folderApi({
        action: action2,
        request,
        query
      });
    default:
      return generateErrorProps(`No handler for "${topLevel}", fullpath: ${path}`);
  }
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-S4TGLKH7.js", imports: ["/build/_shared/chunk-ELF33S6B.js", "/build/_shared/chunk-T36URGAI.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-COOH246W.js", imports: ["/build/_shared/chunk-FXL7N7GQ.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-3FI74DDR.js", imports: ["/build/_shared/chunk-TUPB47RT.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.$": { id: "routes/api.$", parentId: "root", path: "api/*", index: void 0, caseSensitive: void 0, module: "/build/routes/api.$-Y4UUKNCU.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.download": { id: "routes/api.download", parentId: "root", path: "api/download", index: void 0, caseSensitive: void 0, module: "/build/routes/api.download-5ACXKL6V.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/view.$path.$": { id: "routes/view.$path.$", parentId: "root", path: "view/:path/*", index: void 0, caseSensitive: void 0, module: "/build/routes/view.$path.$-BCT4ERCC.js", imports: ["/build/_shared/chunk-TUPB47RT.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "e04ecdd3", hmr: void 0, url: "/build/manifest-E04ECDD3.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public\\build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, unstable_singleFetch: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/api.download": {
    id: "routes/api.download",
    parentId: "root",
    path: "api/download",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports
  },
  "routes/view.$path.$": {
    id: "routes/view.$path.$",
    parentId: "root",
    path: "view/:path/*",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports2
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: route_exports3
  },
  "routes/api.$": {
    id: "routes/api.$",
    parentId: "root",
    path: "api/*",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports4
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
