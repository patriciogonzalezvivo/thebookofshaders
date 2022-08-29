cmake_minimum_required(VERSION 3.15)

project(TheBookOfShaders LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(SFML 2.5 COMPONENTS graphics REQUIRED)

add_executable(TheBookOfShaders
	src/main.cpp
)

target_link_libraries(TheBookOfShaders sfml-graphics)

install(TARGETS TheBookOfShaders
		RUNTIME DESTINATION .)
install(DIRECTORY data
		DESTINATION .)