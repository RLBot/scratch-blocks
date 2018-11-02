/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview number input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldNumberSlider');

goog.require('Blockly.Field');
goog.require('Blockly.DropDownDiv');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.style');
goog.require('goog.color');
goog.require('goog.ui.Slider');

/**
 * Class for an editable number field with a slider.
 * In scratch-blocks, the min/max/precision properties are only used
 * to construct a restrictor on typable characters, and to inform the pop-up
 * numpad on touch devices.
 * These properties are included here (i.e. instead of just accepting a
 * decimalAllowed, negativeAllowed) to maintain API compatibility with Blockly
 * and Blockly for Android.
 * @param {(string|number)=} opt_value The initial content of the field. The value
 *     should cast to a number, and if it does not, '0' will be used.
 * @param {(string|number)=} opt_min Minimum value.
 * @param {(string|number)=} opt_max Maximum value.
 * @param {(string|number)=} opt_precision Precision for value.
 * @param {Function=} opt_validator An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns the accepted text or null to abort
 *     the change.
 * @extends {Blockly.Field}
 * @constructor
 */

Blockly.FieldNumberSlider = function(opt_value, opt_min, opt_max, opt_precision, opt_validator) {
  var numRestrictor = this.getNumRestrictor(opt_min, opt_max, opt_precision);
  opt_value = (opt_value && !isNaN(opt_value)) ? String(opt_value) : '0';
  Blockly.FieldNumberSlider.superClass_.constructor.call(
    this, opt_value, opt_validator, numRestrictor);
  this.addArgType('number');
};

goog.inherits(Blockly.FieldNumberSlider, Blockly.FieldNumber);

/**
 * Construct a FieldNumberSlider from a JSON arg object.
 * @param {!Object} options A JSON object with options (value, min, max, and
 *                          precision).
 * @returns {!Blockly.FieldNumberSlider} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldNumberSlider.fromJson = function(options) {
  return new Blockly.FieldNumberSlider(options['value'],
      options['min'], options['max'], options['precision']);
};

/**
 * Update the readouts and slider backgrounds after value has changed.
 * @private
 */
Blockly.FieldNumberSlider.prototype.updateDom_ = function() {
  if (this.valueSlider_) {

    // Update the readouts
    this.valueReadout_.textContent = this.getText();
  }
};

/**
 * Update the slider handle positions from the current field value.
 * @private
 */
Blockly.FieldNumberSlider.prototype.updateSliderHandles_ = function() {
  if (this.valueSlider_) {
    var num = Number.parseFloat(this.getValue());
    if (num == 0) {
      // Set some other value first. This is a workaround for a bug where setting the initial value
      // to zero takes no effect. https://github.com/google/closure-library/issues/936
      this.valueSlider_.setValue(1); 
    }
    this.valueSlider_.setValue(num);
  }
};

/**
 * Create label and readout DOM elements, returning the readout
 * @param {string} labelText - Text for the label
 * @return {Array} The container node and the readout node.
 * @private
 */
Blockly.FieldNumberSlider.prototype.createLabelDom_ = function(labelText) {
  var labelContainer = document.createElement('div');
  labelContainer.setAttribute('class', 'scratchColourPickerLabel');
  var readout = document.createElement('span');
  readout.setAttribute('class', 'scratchColourPickerReadout');
  var label = document.createElement('span');
  label.setAttribute('class', 'scratchColourPickerLabelText');
  label.textContent = labelText;
  labelContainer.appendChild(label);
  labelContainer.appendChild(readout);
  return [labelContainer, readout];
};

/**
 * Factory for creating the different slider callbacks
 * @return {function} the callback for slider update
 * @private
 */
Blockly.FieldNumberSlider.prototype.sliderCallbackFactory_ = function() {
  var self = this;
  return function(event) {
    var value = event.target.getValue();
    
    if (value !== null) {
      self.setValue(Number.parseFloat(value || 0).toFixed(1), true);
      self.updateDom_();
    }
  };
};

/**
 * Create slider under the field.
 * @private
 */
Blockly.FieldNumberSlider.prototype.showEditor_ = function() {
  Blockly.DropDownDiv.hideWithoutAnimation();
  Blockly.DropDownDiv.clearContent();
  var div = Blockly.DropDownDiv.getContentDiv();

  var labelDom = this.createLabelDom_(Blockly.Msg.VALUE_LABEL);
  div.appendChild(labelDom[0]);
  this.valueReadout_ = labelDom[1];
  this.valueSlider_ = new goog.ui.Slider();
  this.valueSlider_.setUnitIncrement(0.1);
  this.valueSlider_.setStep(0.1);
  this.valueSlider_.setMinimum(-1);
  this.valueSlider_.setMaximum(1);
  this.valueSlider_.setMoveToPointEnabled(true);
  this.valueSlider_.render(div);

  goog.style.setStyle(this.valueSlider_.getElement(), 'background-color', '#EEEEEE');

  Blockly.FieldNumberSlider.valueChangeEventKey_ = goog.events.listen(this.valueSlider_,
      goog.ui.Component.EventType.CHANGE,
      this.sliderCallbackFactory_());

  Blockly.DropDownDiv.setColour('#ffffff', '#dddddd');
  Blockly.DropDownDiv.setCategory(this.sourceBlock_.parentBlock_.getCategory());
  Blockly.DropDownDiv.showPositionedByBlock(this, this.sourceBlock_);

  this.updateSliderHandles_();
  this.updateDom_();
};

Blockly.FieldNumberSlider.prototype.dispose = function() {
  if (Blockly.FieldColourSlider.valueChangeEventKey_) {
    goog.events.unlistenByKey(Blockly.FieldColourSlider.valueChangeEventKey_);
  }
  Blockly.Events.setGroup(false);
  Blockly.FieldNumberSlider.superClass_.dispose.call(this);
};

Blockly.Field.register('field_number_slider', Blockly.FieldNumberSlider);
