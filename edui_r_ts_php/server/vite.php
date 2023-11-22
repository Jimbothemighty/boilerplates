<?php

// https://github.com/phpcoder/vite-php
// https://github.com/andrefelipe/vite-php-setup

if (!isset($relPath)) {
    $relPath = ""; // it must always be set tbh
}

// Helpers here serve as example. Change to suit your needs.
define("VITE_HOST", 'http://localhost:5133'); // $_SERVER["SERVER_NAME"]
define("DIST_LOC", $relPath . 'dist/');
$viteExists = null;

// For a real-world example check here:
// https://github.com/wp-bond/bond/blob/master/src/Tooling/Vite.php
// https://github.com/wp-bond/boilerplate/tree/master/app/themes/boilerplate

// you might check @vitejs/plugin-legacy if you need to support older browsers
// https://github.com/vitejs/vite/tree/main/packages/plugin-legacy



// Prints all the html entries needed for Vite

function getViteHmrPreamble($entry) {
    $vite_host = VITE_HOST;

    return "<script type=\"module\">
    import \"{$vite_host}/@vite/client\"
    window.process = { env: { NODE_ENV: \"development\" }}
    </script>\n";
}

/**
 * Enables react page reload
 */
function getViteReactPreamble($entry) {
    global $viteExists;
    
    if (!$viteExists) {
        return "";
    }

    $vite_host = VITE_HOST;

    return "
    <script type=\"module\">
        import RefreshRuntime from \"{$vite_host}/@react-refresh\"
        window.\$RefreshReg$ = () => {}
        window.\$RefreshSig$ = () => (type) => type
        RefreshRuntime.injectIntoGlobalHook(window)
        window.__vite_plugin_react_preamble_installed__ = true
    </script>\n
    <script type=\"module\" src=\"{$vite_host}/@vite/client\"></script>\n";
}

function vite($entry, $isReact = true) {

    $output = "\n" . jsTag($entry)
        . "\n" . jsPreloadImports($entry)
        . "\n" . cssTag($entry);

    if ($isReact) {
        $output = getViteReactPreamble($entry) . $output;
    } else {
        //$output = getViteHmrPreamble($entry) . $output;
    }

    return $output;
}


// Some dev/prod mechanism would exist in your project

function isDev($entry)
{
    global $viteExists;
    // This method is very useful for the local server
    // if we try to access it, and by any means, didn't started Vite yet
    // it will fallback to load the production files from manifest
    // so you still navigate your site as you intended!

    $isLocalhost = (strpos($_SERVER["SERVER_NAME"], 'localhost') !== false);

    if (!$isLocalhost) {
         // we are on production, there will be no vite server!
         // no need for unncessary curl request in this case,
         // it would slow down the app since it's a multi-page app this gets checked on each page load. so just return false
        return false;
    }

    if ($viteExists !== null) {
        return $viteExists;
    }

    $handle = curl_init(VITE_HOST . '/' . $entry);
    curl_setopt($handle, CURLOPT_TIMEOUT, 3);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($handle, CURLOPT_NOBODY, true);

    curl_exec($handle);
    $error = curl_errno($handle);
    curl_close($handle);

    $viteExists = !$error;

    // if (!$viteExists && $isLocalhost) {
    //     exit("<div style='padding: 10px;'>
	// 		<h2>Vite server is not running on localhost.</h2><br>
    //     </div>");
    // }

    return $viteExists;
}


// Helpers to print tags

function jsTag($entry)
{
    global $relPath;

    $dev = isDev($entry);
    $url = $dev ? VITE_HOST . '/' . $entry : assetUrl($entry);

    if (!$url) {
        return '';
    }
    return '<script type="module" crossorigin src="'
        . $url
        . '"></script>';
}

function jsPreloadImports($entry)
{
    if (isDev($entry)) {
        return '';
    }

    $res = '';
    foreach (importsUrls($entry) as $url) {
        $res .= '<link rel="modulepreload" href="'
            . $url
            . '">';
    }
    return $res;
}

function cssTag($entry)
{
    // not needed on dev, it's inject by Vite
    if (isDev($entry)) {
        return '';
    }

    $tags = '';
    foreach (cssUrls($entry) as $url) {
        $tags .= '<link rel="stylesheet" href="'
            . $url
            . '">';
    }
    return $tags;
}


// Helpers to locate files

function getManifest()
{
    $content = file_get_contents(DIST_LOC . 'manifest.json');
    return json_decode($content, true);
}

function assetUrl($entry)
{
    $manifest = getManifest();

    if (!isset($manifest[$entry])) {
        exit("File {$entry} cannot be located");
    }

    return DIST_LOC . $manifest[$entry]['file'];
}

function importsUrls($entry)
{
    $urls = array();
    $manifest = getManifest();

    if (!empty($manifest[$entry]['imports'])) {
        foreach ($manifest[$entry]['imports'] as $imports) {
            $urls[] = DIST_LOC . $manifest[$imports]['file'];
        }
    }
    return $urls;
}

function cssUrls($entry)
{
    $urls = array();
    $manifest = getManifest();

    if (!empty($manifest[$entry]['css'])) {
        foreach ($manifest[$entry]['css'] as $file) {
            $urls[] = DIST_LOC . $file;
        }
    }
    return $urls;
}