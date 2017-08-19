// Copyright 2015 Patricio Gonzalez Vivo (http://patriciogonzalezvivo.com)

#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){

    //  Load and compile the shader
    //
    shader.load("","shader.frag");
}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){

    // Replace the pipeline with our shader
    shader.begin();

    // Send uniforms
    shader.setUniform1f("u_time", ofGetElapsedTimef());
    shader.setUniform2f("u_mouse", mouseX, mouseY);
    shader.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());

    // make a billboard
    ofRect(0,0,ofGetWidth(), ofGetHeight());

    // Default shader pipeline
    shader.end();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

    //  Reload everytime you press a key
    //
    shader.load("","shader.frag");
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){

}
