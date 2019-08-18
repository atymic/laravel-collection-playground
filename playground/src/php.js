function encode(input) {
  return encodeURIComponent(input).replace(/'/g, '%27');
}

window.phpModule = {};

const phpModuleOptions = {
  postRun() {
    console.info('PHP Loaded');
    vue.$emit('php.loaded');
  },
  print(...lines) {
    const output = lines.join(' ');

    console.info(`Output received from PHP: ${output}`);
    vue.$emit('php.print', output);
  },
  printErr(...lines) {
    const error = lines.join(' ');

    console.error(`Error received from PHP: ${error}`);
    vue.$emit('php.error', error);
  },
};

window.phpModule = PHP(phpModuleOptions);

vue.$on('php.run.collection', (inputJson, collectionCode) => {
  const code = `$phar = 'phar://app.phar';require $phar . '/index.php';playground('${encode(inputJson)}', 'return ${encode(collectionCode)}');echo PHP_EOL;`;
  const ret = phpModule.ccall('pib_eval', 'number', ['string'], [code]);
  console.log(`PHP ran with ${ret}`);
});
