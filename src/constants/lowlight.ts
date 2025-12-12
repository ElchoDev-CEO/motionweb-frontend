import { createLowlight } from 'lowlight';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import ts from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import dart from 'highlight.js/lib/languages/dart';
import go from 'highlight.js/lib/languages/go';

const lowlight = createLowlight();

lowlight.register({ html });
lowlight.register({ css });
lowlight.register({ scss });
// lowlight.register({ ts });
lowlight.register({ javascript });
lowlight.register({ typescript });
lowlight.register({ python });
lowlight.register({ java });
lowlight.register({ dart });
lowlight.register({ go });

export default lowlight;
