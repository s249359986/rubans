// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import filesize from 'rollup-plugin-filesize';
import { version } from './package.json';

const banner =
    '/*!\n' + ' * util.js v' + version + '\n' + ' * by ruban\n' + ' */';
export default {
    input: 'index.js',
    output: [
        {
            file: './dist/util.common.js',
            format: 'cjs',
            sourcemap: true,
            banner
        },
        {
            file: './dist/util.esm.js',
            format: 'es',
            sourcemap: true,
            banner
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        babel({
            presets: [
                [
                    'env',
                    {
                        modules: false
                    }
                ]
            ],
            plugins: ['external-helpers'],
            babelrc: false,
            exclude: 'node_modules/**'
        }),
        json(),
        filesize()
    ]
};
