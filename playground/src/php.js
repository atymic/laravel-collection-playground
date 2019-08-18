function encode(input) {
  return encodeURIComponent(input).replace(/'/g, "%27")
}

window.phpModule = {};

let phpModuleOptions = {
  postRun: function () {
    console.info('PHP Loaded');
    vue.$emit('php.loaded')
  },
  print: function (text) {
    if (arguments.length > 1) {
      text = Array.prototype.slice.call(arguments).join(' ');
    }

    console.info(`Output received from PHP: ${text}`);
    vue.$emit('php.print', text)
  },
  printErr: function (text) {
    if (arguments.length > 1) {
      text = Array.prototype.slice.call(arguments).join(' ');
    }

    console.error(`Error received from PHP: ${text}`);
    vue.$emit('php.error', text)
  }
};

window.phpModule = PHP(phpModuleOptions);

vue.$on('php.run.collection', (inputJson, collectionCode) => {
  const code = `$phar = 'phar://app.phar';require $phar . '/index.php';playground('${encode(inputJson)}', 'return ${encode(collectionCode)}');echo PHP_EOL;`
  let ret = phpModule.ccall('pib_eval', 'number', ["string"], [code])
  console.log(code)
  console.log(`PHP ran with ${ret}`)
})
