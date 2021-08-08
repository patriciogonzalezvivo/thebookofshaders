#include <SFML/Graphics.hpp>

#include <iostream>

int main()
{
    auto window = sf::RenderWindow{ { 800U, 800U }, "The Book of Shaders" };
    window.setFramerateLimit(144);

    auto clock = sf::Clock{};

    auto shape = sf::RectangleShape{ sf::Vector2f{ window.getSize() } };

    auto shader = sf::Shader{};
    if (!shader.loadFromFile("data/shader.frag", sf::Shader::Fragment))
    {
        std::cerr << "Couldn't load fragment shader\n";
        return -1;
    }

    auto mouse_position = sf::Vector2f{};

    while (window.isOpen())
    {
        for (auto event = sf::Event{}; window.pollEvent(event);)
        {
            if (event.type == sf::Event::Closed)
            {
                window.close();
            }
            else if (event.type == sf::Event::MouseMoved)
            {
                mouse_position = window.mapPixelToCoords({ event.mouseMove.x, event.mouseMove.y });
            }
        }

        shader.setUniform("u_resolution", sf::Glsl::Vec2{ window.getSize() });
        shader.setUniform("u_mouse", sf::Glsl::Vec2{ mouse_position });
        shader.setUniform("u_time", clock.getElapsedTime().asSeconds());

        window.clear();
        window.draw(shape, &shader);
        window.display();
    }
}