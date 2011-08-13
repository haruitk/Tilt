/***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Tilt: A WebGL-based 3D visualization of a webpage.
 *
 * The Initial Developer of the Original Code is Victor Porof.
 * Portions created by the Initial Developer are Copyright (C) 2011
 * the Initial Developer. All Rights Reserved.
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the LGPL or the GPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 ***** END LICENSE BLOCK *****/
"use strict";

var TiltChrome = TiltChrome || {};
var EXPORTED_SYMBOLS = ["TiltChrome.Shaders"];

TiltChrome.Shaders = {};

/** 
 * A custom visualization shader..
 *
 * @param {attribute} vertexPosition: the vertex position
 * @param {attribute} vertexTexCoord: texture coordinates used by the sampler
 * @param {uniform} mvMatrix: the model view matrix
 * @param {uniform} projMatrix: the projection matrix
 * @param {uniform} color: the color to multiply the sampled pixel with
 * @param {Uniform} texalpha: the texture alpha color, blended with the color
 * @param {Uniform} sampler: the texture sampler to fetch the pixels from
 */
TiltChrome.Shaders.Visualization = {

  /**
   * Vertex shader.
   */
  vs: [
"attribute vec3 vertexPosition;",
"attribute vec2 vertexTexCoord;",

"uniform mat4 mvMatrix;",
"uniform mat4 projMatrix;",

"varying vec2 texCoord;",

"void main(void) {",
"  gl_Position = projMatrix * mvMatrix * vec4(vertexPosition, 1.0);",
"  texCoord = vertexTexCoord;",
"}"
].join("\n"),

  /**
   * Fragment shader.
   */
  fs: [
"#ifdef GL_ES",
"precision highp float;",
"#endif",

"uniform vec4 color;",
"uniform float texalpha;",
"uniform sampler2D sampler;",

"varying vec2 texCoord;",

"void main(void) {",
"  vec4 tex = texture2D(sampler, texCoord);",
"  gl_FragColor = color * tex * texalpha + color * (1.0 - texalpha);",
"}"
].join("\n")
};