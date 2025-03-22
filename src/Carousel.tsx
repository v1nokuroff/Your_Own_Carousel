import React, { useState, useEffect } from "react";
import { translations } from "./language/translations";
interface ItemProps {
  id: number;
  enabled: boolean;
  delay: number;
  position: number;
  link?: string;
  path?: string;
  description?: string;
  readonly: boolean;
}
type TypeLanguage = {
  language: 'ru' | 'en',
}



const Carousel:React.FC<TypeLanguage> = ({language}) => {
  const text = translations[language];

  const [slides, setSlides] = useState<ItemProps[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);


  // Carousel function
  useEffect(() => {
    const enabledSlides = slides
        .filter((slide) => slide.enabled)
        .sort((a, b) => a.position - b.position);

    if (enabledSlides.length === 0) return;

    const currentSlide = enabledSlides[currentSlideIndex % enabledSlides.length];
    const delay = currentSlide.delay * 1000 || 3000; // Delay in milliseconds, default to 3 seconds

    const timer = setTimeout(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % enabledSlides.length);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentSlideIndex, slides]);

  const handleInputChange = (
    id: number,
    field: keyof ItemProps,
    value: string | boolean | number
  ) => {
    setSlides((prevSlides) =>
      prevSlides.map((slide) =>
        slide.id === id ? { ...slide, [field]: value } : slide
      )
    );
  };

  const handleAddSlide = () => {
    const newSlide: ItemProps = {
      id: Date.now(),
      enabled: false,
      delay: 3,
      position: slides.length + 1,
      link: "",
      path: "",
      description: "",
      readonly: false,
    };
    setSlides((prevSlides) => [...prevSlides, newSlide]);
  };

  const handleDeleteSlide = (id: number) => {
    setSlides((prevSlides) => prevSlides.filter((slide) => slide.id !== id));
  };

  const handleEditSlide = (id: number) => {
    setSlides((prevSlides) =>
      prevSlides.map((slide) => {
        if (slide.id === id) {
          if (!slide.path) {
            alert(text.fillData);
            return slide;
          }
          return { ...slide, readonly: !slide.readonly, enabled: false };
        }
        return slide;
      })
    );
  };

  const enabledSlides = slides
    .filter((slide) => slide.enabled)
    .sort((a, b) => a.position - b.position);

  const currentSlide = enabledSlides[currentSlideIndex % enabledSlides.length];

  return (
    <div className='container' >
      {/* Slides carousel block */}
      <div className='carousel' >
        <h2>{text.slideCarousel}</h2>
        {enabledSlides.length > 0 ? (
          currentSlide ? (
            <div>
              <a href={currentSlide.link} target="_blank">
                <img
                  src={currentSlide.path || "https://via.placeholder.com/600x300"}
                  alt={`Slide ${currentSlide.position}`}
                  className='image'
                />
              </a>
              <p className='label'>{currentSlide.description || text.noDescription}</p>
            </div>
          ) : null
        ) : (
          <p>{text.noEnabledSlides}</p>
        )}
      </div>

      {/* Creating and editing slides Block */}
      <div className='editor'>
        <h2 style={{ textAlign: "center" }}>{text.slideManagement}</h2>
        {slides.map((slide) => (
          <div
            className='slide-form'
            key={slide.id}
          >
            <input
              className='input checkbox'
              readOnly={slide.readonly}
              type="checkbox"
              checked={slide.enabled}
              onChange={(e) =>
                handleInputChange(slide.id, "enabled", e.target.checked)
                //   handleEditSlide(slide.id, 'enable')
              }
            />
            <label>
              {text.enable}
            </label>
            <div>
              <label>
                {text.delay}:{" "}
                {slide.readonly ? (
                  slide.delay
                ) : (
                  <input
                    className='input'
                    style={{ width: "300px" }}
                    readOnly={slide.readonly}
                    type="number"
                    value={slide.delay}
                    onChange={(e) =>
                      handleInputChange(slide.id, "delay", +e.target.value)
                    }
                  />
                )}
              </label>
            </div>
            <div>
              <label>
                {text.position}:{" "}
                {slide.readonly ? (
                  slide.position
                ) : (
                  <input
                    className='input'
                    readOnly={slide.readonly}
                    type="number"
                    value={slide.position}
                    onChange={(e) =>
                      handleInputChange(slide.id, "position", +e.target.value)
                    }
                  />
                )}
              </label>
            </div>
            <div className='label'>
              <label>
                {text.link}:{" "}
                {slide.readonly ? (
                  slide.link
                ) : (
                  <input
                    className='input'
                    readOnly={slide.readonly}
                    type="text"
                    value={slide.link}
                    onChange={(e) =>
                      handleInputChange(slide.id, "link", e.target.value)
                    }
                  />
                )}
              </label>
            </div>
            <div className='label'>
              <label>
                {text.imageURL}:{" "}
                {slide.readonly ? (
                  slide.path
                ) : (
                  <input
                    className='input'
                    readOnly={slide.readonly}
                    type="text"
                    value={slide.path}
                    onChange={(e) =>
                      handleInputChange(slide.id, "path", e.target.value)
                    }
                  />
                )}
              </label>
            </div>
            <div className='label' >
              <label>
                {text.description}:{" "}
                {slide.readonly ? (
                  slide.description
                ) : (
                  <textarea
                    className='input'
                    readOnly={slide.readonly}
                    value={slide.description}
                    onChange={(e) =>
                      handleInputChange(slide.id, "description", e.target.value)
                    }
                    rows={3}
                    style={{ width: "100%", resize: "vertical" }}
                  />
                )}
              </label>
            </div>
            <div className='button-group form'>
              <button className='button' onClick={() => handleDeleteSlide(slide.id)}>
                {text.deleteSlide}
              </button>
              <button className='button' onClick={() => handleEditSlide(slide.id)}>
                {slide.readonly ? text.edit : text.save}
              </button>
            </div>
          </div>
        ))}
        <button className='button create' onClick={handleAddSlide}>{text.createNewSlide}</button>
      </div>
    </div>
  );
};




export default Carousel;