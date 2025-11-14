
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```sh
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const SELENIUM_JAR_PATH: string;
	export const npm_config_userconfig: string;
	export const CONDA: string;
	export const GITHUB_WORKSPACE: string;
	export const npm_config_cache: string;
	export const NIX_BUILD_CORES: string;
	export const NIX_GCROOT: string;
	export const JAVA_HOME_11_X64: string;
	export const configureFlags: string;
	export const JAVA_HOME_25_X64: string;
	export const mesonFlags: string;
	export const shell: string;
	export const depsHostHost: string;
	export const NODE: string;
	export const GITHUB_PATH: string;
	export const GITHUB_ACTION: string;
	export const JAVA_HOME: string;
	export const GITHUB_RUN_NUMBER: string;
	export const RUNNER_NAME: string;
	export const GRADLE_HOME: string;
	export const STRINGS: string;
	export const GITHUB_REPOSITORY_OWNER_ID: string;
	export const ACTIONS_RUNNER_ACTION_ARCHIVE_CACHE: string;
	export const XDG_CONFIG_HOME: string;
	export const depsTargetTarget: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const DOTNET_SKIP_FIRST_TIME_EXPERIENCE: string;
	export const stdenv: string;
	export const COLOR: string;
	export const ANT_HOME: string;
	export const npm_config_local_prefix: string;
	export const JAVA_HOME_8_X64: string;
	export const GITHUB_TRIGGERING_ACTOR: string;
	export const builder: string;
	export const GITHUB_REF_TYPE: string;
	export const shellHook: string;
	export const npm_config_globalconfig: string;
	export const EDITOR: string;
	export const phases: string;
	export const HOMEBREW_CLEANUP_PERIODIC_FULL_DAYS: string;
	export const ANDROID_NDK: string;
	export const BOOTSTRAP_HASKELL_NONINTERACTIVE: string;
	export const PWD: string;
	export const PIPX_BIN_DIR: string;
	export const SOURCE_DATE_EPOCH: string;
	export const LOGNAME: string;
	export const NIX_ENFORCE_NO_NATIVE: string;
	export const GITHUB_REPOSITORY_ID: string;
	export const GITHUB_ACTIONS: string;
	export const NIX_PATH: string;
	export const npm_config_init_module: string;
	export const ANDROID_NDK_LATEST_HOME: string;
	export const SYSTEMD_EXEC_PID: string;
	export const GITHUB_SHA: string;
	export const GITHUB_WORKFLOW_REF: string;
	export const CXX: string;
	export const POWERSHELL_DISTRIBUTION_CHANNEL: string;
	export const _: string;
	export const TEMPDIR: string;
	export const RUNNER_ENVIRONMENT: string;
	export const system: string;
	export const HOST_PATH: string;
	export const DOTNET_MULTILEVEL_LOOKUP: string;
	export const GITHUB_REF: string;
	export const RUNNER_OS: string;
	export const IN_NIX_SHELL: string;
	export const doInstallCheck: string;
	export const GITHUB_REF_PROTECTED: string;
	export const HOME: string;
	export const NIX_BINTOOLS: string;
	export const GITHUB_API_URL: string;
	export const LANG: string;
	export const GOROOT_1_25_X64: string;
	export const RUNNER_TRACKING_ID: string;
	export const depsTargetTargetPropagated: string;
	export const npm_package_version: string;
	export const RUNNER_ARCH: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const cmakeFlags: string;
	export const RUNNER_TEMP: string;
	export const outputs: string;
	export const GITHUB_STATE: string;
	export const NIX_STORE: string;
	export const TMPDIR: string;
	export const EDGEWEBDRIVER: string;
	export const JAVA_HOME_21_X64: string;
	export const GITHUB_ENV: string;
	export const LD: string;
	export const INVOCATION_ID: string;
	export const GITHUB_EVENT_PATH: string;
	export const GITHUB_EVENT_NAME: string;
	export const buildPhase: string;
	export const GITHUB_RUN_ID: string;
	export const JAVA_HOME_17_X64: string;
	export const INIT_CWD: string;
	export const ANDROID_NDK_HOME: string;
	export const READELF: string;
	export const GITHUB_STEP_SUMMARY: string;
	export const HOMEBREW_NO_AUTO_UPDATE: string;
	export const GITHUB_ACTOR: string;
	export const npm_lifecycle_script: string;
	export const doCheck: string;
	export const NVM_DIR: string;
	export const SGX_AESM_ADDR: string;
	export const GITHUB_RUN_ATTEMPT: string;
	export const npm_config_npm_version: string;
	export const depsBuildBuild: string;
	export const ANDROID_HOME: string;
	export const GITHUB_GRAPHQL_URL: string;
	export const npm_package_name: string;
	export const ACCEPT_EULA: string;
	export const SIZE: string;
	export const propagatedNativeBuildInputs: string;
	export const npm_config_prefix: string;
	export const strictDeps: string;
	export const USER: string;
	export const GITHUB_SERVER_URL: string;
	export const PIPX_HOME: string;
	export const AR: string;
	export const AS: string;
	export const GECKOWEBDRIVER: string;
	export const TEMP: string;
	export const NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const npm_lifecycle_event: string;
	export const CHROMEWEBDRIVER: string;
	export const SHLVL: string;
	export const NIX_BUILD_TOP: string;
	export const NM: string;
	export const NIX_CFLAGS_COMPILE: string;
	export const ANDROID_SDK_ROOT: string;
	export const VCPKG_INSTALLATION_ROOT: string;
	export const patches: string;
	export const GITHUB_ACTOR_ID: string;
	export const RUNNER_TOOL_CACHE: string;
	export const ImageVersion: string;
	export const DOTNET_NOLOGO: string;
	export const buildInputs: string;
	export const preferLocalBuild: string;
	export const GOROOT_1_23_X64: string;
	export const GITHUB_WORKFLOW_SHA: string;
	export const GOROOT_1_24_X64: string;
	export const GITHUB_REF_NAME: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const GITHUB_JOB: string;
	export const XDG_RUNTIME_DIR: string;
	export const AZURE_EXTENSION_DIR: string;
	export const NODE_PATH: string;
	export const depsBuildTarget: string;
	export const OBJCOPY: string;
	export const out: string;
	export const npm_package_json: string;
	export const GITHUB_REPOSITORY: string;
	export const GOROOT_1_22_X64: string;
	export const CHROME_BIN: string;
	export const ANDROID_NDK_ROOT: string;
	export const STRIP: string;
	export const GITHUB_RETENTION_DAYS: string;
	export const JOURNAL_STREAM: string;
	export const RUNNER_WORKSPACE: string;
	export const XDG_DATA_DIRS: string;
	export const GITHUB_ACTION_REPOSITORY: string;
	export const TMP: string;
	export const OBJDUMP: string;
	export const npm_config_noproxy: string;
	export const PATH: string;
	export const propagatedBuildInputs: string;
	export const npm_config_node_gyp: string;
	export const dontAddDisableDepTrack: string;
	export const GITHUB_BASE_REF: string;
	export const CC: string;
	export const GHCUP_INSTALL_BASE_PREFIX: string;
	export const CI: string;
	export const NIX_CC: string;
	export const SWIFT_PATH: string;
	export const ImageOS: string;
	export const depsBuildTargetPropagated: string;
	export const depsBuildBuildPropagated: string;
	export const GITHUB_REPOSITORY_OWNER: string;
	export const npm_config_global_prefix: string;
	export const NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const GITHUB_HEAD_REF: string;
	export const GITHUB_ACTION_REF: string;
	export const ENABLE_RUNNER_TRACING: string;
	export const GITHUB_WORKFLOW: string;
	export const CONFIG_SHELL: string;
	export const DEBIAN_FRONTEND: string;
	export const __structuredAttrs: string;
	export const npm_node_execpath: string;
	export const GITHUB_OUTPUT: string;
	export const RANLIB: string;
	export const AGENT_TOOLSDIRECTORY: string;
	export const npm_config_engine_strict: string;
	export const NIX_HARDENING_ENABLE: string;
	export const NIX_LDFLAGS: string;
	export const nativeBuildInputs: string;
	export const name: string;
	export const depsHostHostPropagated: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		SELENIUM_JAR_PATH: string;
		npm_config_userconfig: string;
		CONDA: string;
		GITHUB_WORKSPACE: string;
		npm_config_cache: string;
		NIX_BUILD_CORES: string;
		NIX_GCROOT: string;
		JAVA_HOME_11_X64: string;
		configureFlags: string;
		JAVA_HOME_25_X64: string;
		mesonFlags: string;
		shell: string;
		depsHostHost: string;
		NODE: string;
		GITHUB_PATH: string;
		GITHUB_ACTION: string;
		JAVA_HOME: string;
		GITHUB_RUN_NUMBER: string;
		RUNNER_NAME: string;
		GRADLE_HOME: string;
		STRINGS: string;
		GITHUB_REPOSITORY_OWNER_ID: string;
		ACTIONS_RUNNER_ACTION_ARCHIVE_CACHE: string;
		XDG_CONFIG_HOME: string;
		depsTargetTarget: string;
		MEMORY_PRESSURE_WRITE: string;
		DOTNET_SKIP_FIRST_TIME_EXPERIENCE: string;
		stdenv: string;
		COLOR: string;
		ANT_HOME: string;
		npm_config_local_prefix: string;
		JAVA_HOME_8_X64: string;
		GITHUB_TRIGGERING_ACTOR: string;
		builder: string;
		GITHUB_REF_TYPE: string;
		shellHook: string;
		npm_config_globalconfig: string;
		EDITOR: string;
		phases: string;
		HOMEBREW_CLEANUP_PERIODIC_FULL_DAYS: string;
		ANDROID_NDK: string;
		BOOTSTRAP_HASKELL_NONINTERACTIVE: string;
		PWD: string;
		PIPX_BIN_DIR: string;
		SOURCE_DATE_EPOCH: string;
		LOGNAME: string;
		NIX_ENFORCE_NO_NATIVE: string;
		GITHUB_REPOSITORY_ID: string;
		GITHUB_ACTIONS: string;
		NIX_PATH: string;
		npm_config_init_module: string;
		ANDROID_NDK_LATEST_HOME: string;
		SYSTEMD_EXEC_PID: string;
		GITHUB_SHA: string;
		GITHUB_WORKFLOW_REF: string;
		CXX: string;
		POWERSHELL_DISTRIBUTION_CHANNEL: string;
		_: string;
		TEMPDIR: string;
		RUNNER_ENVIRONMENT: string;
		system: string;
		HOST_PATH: string;
		DOTNET_MULTILEVEL_LOOKUP: string;
		GITHUB_REF: string;
		RUNNER_OS: string;
		IN_NIX_SHELL: string;
		doInstallCheck: string;
		GITHUB_REF_PROTECTED: string;
		HOME: string;
		NIX_BINTOOLS: string;
		GITHUB_API_URL: string;
		LANG: string;
		GOROOT_1_25_X64: string;
		RUNNER_TRACKING_ID: string;
		depsTargetTargetPropagated: string;
		npm_package_version: string;
		RUNNER_ARCH: string;
		MEMORY_PRESSURE_WATCH: string;
		cmakeFlags: string;
		RUNNER_TEMP: string;
		outputs: string;
		GITHUB_STATE: string;
		NIX_STORE: string;
		TMPDIR: string;
		EDGEWEBDRIVER: string;
		JAVA_HOME_21_X64: string;
		GITHUB_ENV: string;
		LD: string;
		INVOCATION_ID: string;
		GITHUB_EVENT_PATH: string;
		GITHUB_EVENT_NAME: string;
		buildPhase: string;
		GITHUB_RUN_ID: string;
		JAVA_HOME_17_X64: string;
		INIT_CWD: string;
		ANDROID_NDK_HOME: string;
		READELF: string;
		GITHUB_STEP_SUMMARY: string;
		HOMEBREW_NO_AUTO_UPDATE: string;
		GITHUB_ACTOR: string;
		npm_lifecycle_script: string;
		doCheck: string;
		NVM_DIR: string;
		SGX_AESM_ADDR: string;
		GITHUB_RUN_ATTEMPT: string;
		npm_config_npm_version: string;
		depsBuildBuild: string;
		ANDROID_HOME: string;
		GITHUB_GRAPHQL_URL: string;
		npm_package_name: string;
		ACCEPT_EULA: string;
		SIZE: string;
		propagatedNativeBuildInputs: string;
		npm_config_prefix: string;
		strictDeps: string;
		USER: string;
		GITHUB_SERVER_URL: string;
		PIPX_HOME: string;
		AR: string;
		AS: string;
		GECKOWEBDRIVER: string;
		TEMP: string;
		NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		npm_lifecycle_event: string;
		CHROMEWEBDRIVER: string;
		SHLVL: string;
		NIX_BUILD_TOP: string;
		NM: string;
		NIX_CFLAGS_COMPILE: string;
		ANDROID_SDK_ROOT: string;
		VCPKG_INSTALLATION_ROOT: string;
		patches: string;
		GITHUB_ACTOR_ID: string;
		RUNNER_TOOL_CACHE: string;
		ImageVersion: string;
		DOTNET_NOLOGO: string;
		buildInputs: string;
		preferLocalBuild: string;
		GOROOT_1_23_X64: string;
		GITHUB_WORKFLOW_SHA: string;
		GOROOT_1_24_X64: string;
		GITHUB_REF_NAME: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		GITHUB_JOB: string;
		XDG_RUNTIME_DIR: string;
		AZURE_EXTENSION_DIR: string;
		NODE_PATH: string;
		depsBuildTarget: string;
		OBJCOPY: string;
		out: string;
		npm_package_json: string;
		GITHUB_REPOSITORY: string;
		GOROOT_1_22_X64: string;
		CHROME_BIN: string;
		ANDROID_NDK_ROOT: string;
		STRIP: string;
		GITHUB_RETENTION_DAYS: string;
		JOURNAL_STREAM: string;
		RUNNER_WORKSPACE: string;
		XDG_DATA_DIRS: string;
		GITHUB_ACTION_REPOSITORY: string;
		TMP: string;
		OBJDUMP: string;
		npm_config_noproxy: string;
		PATH: string;
		propagatedBuildInputs: string;
		npm_config_node_gyp: string;
		dontAddDisableDepTrack: string;
		GITHUB_BASE_REF: string;
		CC: string;
		GHCUP_INSTALL_BASE_PREFIX: string;
		CI: string;
		NIX_CC: string;
		SWIFT_PATH: string;
		ImageOS: string;
		depsBuildTargetPropagated: string;
		depsBuildBuildPropagated: string;
		GITHUB_REPOSITORY_OWNER: string;
		npm_config_global_prefix: string;
		NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		GITHUB_HEAD_REF: string;
		GITHUB_ACTION_REF: string;
		ENABLE_RUNNER_TRACING: string;
		GITHUB_WORKFLOW: string;
		CONFIG_SHELL: string;
		DEBIAN_FRONTEND: string;
		__structuredAttrs: string;
		npm_node_execpath: string;
		GITHUB_OUTPUT: string;
		RANLIB: string;
		AGENT_TOOLSDIRECTORY: string;
		npm_config_engine_strict: string;
		NIX_HARDENING_ENABLE: string;
		NIX_LDFLAGS: string;
		nativeBuildInputs: string;
		name: string;
		depsHostHostPropagated: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
