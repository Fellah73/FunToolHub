import { BACKGROUND_GRADIENTS, FOOD_OPTIONS, SNAKE_COLORS } from '@/data/providedServices';
import { motion } from 'framer-motion';
import {
    Droplet,
    Palette,
    Star,
    Wand2
} from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { CustomizationValues } from '../page';

interface CustomizationHubProps {
    setCustomization: Dispatch<SetStateAction<CustomizationValues>>;
    customization: CustomizationValues;
    isGameStarted: boolean;
    isGameOver: boolean;
}
export const CustomizationHub = ({ setCustomization, customization, isGameStarted, isGameOver }: CustomizationHubProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${(!isGameStarted || isGameOver) ? '' : 'pointer-events-none'} p-6 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl mx-auto size-full`}
        >
            <h2 className="text-3xl font-bold mb-6 text-center text-white flex items-center justify-center">
                <Wand2 className="mr-3 text-purple-600" /> Personalization Hub
            </h2>

            {/* Snake Color & Style Section */}
            <motion.section
                className="mb-4 flex justify-center flex-col gap-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Palette className="mr-2 text-blue-500" /> Snake Appearance
                </h3>

                <div className="flex space-x-8 mb-4 items-center justify-center">
                    {SNAKE_COLORS.map((color, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCustomization(
                                prev => ({
                                    ...prev,
                                    snakeColor: color.value
                                })
                            )}
                            className={`border border-fuchsia-600 ${SNAKE_COLORS[index].value.split(' ')[1]} size-14 rounded-full 
                ${customization.snakeColor === color.value ? 'ring-4  ring-blue-300' : ''}
              `}
                        />
                    ))}
                </div>
            </motion.section>

            {/* Food Selection Section */}
            <motion.section
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}

            >
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <Star className="mr-2 text-fuchsia-500" /> Food Selection
                </h3>


                <div className="grid grid-cols-3 gap-4 items-center">
                    {FOOD_OPTIONS.map((food) => (
                        <motion.button
                            key={food.name}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCustomization(
                                prev => ({
                                    ...prev,
                                    foodObject: food.name
                                }))}
                            className={`
                text-4xl p-2 rounded-lg flex items-center justify-center
                ${customization.foodObject === food.name ? ' bg-violet-900 ring-2 ring-purple-600' : 'hover:bg-fuchsia-800'}
              `}
                        >
                            {food.icon}
                        </motion.button>
                    ))}
                </div>
            </motion.section>

            {/* Background Customization Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <Droplet className="mr-2 text-purple-500" /> Background
                </h3>

                <div className="grid grid-cols-2 grid-rows-2 gap-y-4 gap-x-12 mb-4">
                    {BACKGROUND_GRADIENTS.map((gradient, index) => (

                        <motion.div className='flex flex-col gap-y-3 size-full'
                            key={index}
                            whileHover={{ y: [0, -5, 0, 5, 0] }}
                            transition={{ y: { duration: 2, repeat: Infinity } }}>
                            <motion.button

                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setCustomization(
                                    prev => ({
                                        ...prev,
                                        backgroundColor: gradient.value
                                    })
                                )}
                                className={`
                                      bg-gradient-to-br  ${gradient.value}  h-16 rounded-lg 
                                       ${customization.backgroundColor === gradient.value ? 'ring-4  ring-blue-300' : 'ring-2 ring-fuchsia-600'}
                                   `}
                            />
                            <motion.h2

                                className="text-xl text-white text-center">
                                {gradient.name}
                            </motion.h2>
                        </motion.div>

                    ))}
                </div>


            </motion.section>
        </motion.div>
    );
};

export default CustomizationHub;