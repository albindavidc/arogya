import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { PoseCategory, Pose } from './models/pose.model';
import { PoseDetailModalComponent } from './pose-detail-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PoseDetailModalComponent],
})
export class AppComponent {
  selectedGender = signal<'female' | 'male'>('female');

  readonly poseCategories = signal<PoseCategory[]>([
    {
      id: 'inversion',
      title: 'Inversion Poses',
      description: 'Boost Metabolism + Brain Energy. These improve blood flow, activate endocrine glands, and sharpen the mind.',
      poses: [
        { 
          sanskritName: 'Sarvangasana', 
          englishName: 'Shoulder Stand',
          pronunciation: 'sar-van-GAHS-anna',
          benefit: 'Stimulates thyroid', 
          imageUrl: 'https://www.rishikulyogshalarishikesh.com/blog/wp-content/uploads/2024/09/Shoulder-Stand-Pose-683x1024.jpg',
          howToDo: [
            "Lie on your back with arms alongside your body, palms down.",
            "Inhale and lift your legs, hips, and back off the floor, using your hands to support your lower back.",
            "Raise your legs until they are perpendicular to the floor, keeping your torso straight.",
            "Press your sternum towards your chin. Hold the pose, breathing deeply."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 seconds', sets: '1', reps: '1', frequency: 'Once daily during practice' },
            { level: 'Intermediate', duration: '1 minute', sets: '1', reps: '1', frequency: 'Once daily during practice' },
            { level: 'Advanced', duration: '2-3 minutes', sets: '1', reps: '1', frequency: 'Once daily during practice' }
          ],
          why: [
            "Thyroid Health: Stimulates the thyroid and parathyroid glands, regulating metabolism.",
            "Circulation: Improves blood flow to the brain and upper body.",
            "Calming: Soothes the nervous system, reducing stress and anxiety."
          ]
        },
        { 
          sanskritName: 'Sirsasana', 
          englishName: 'Headstand',
          pronunciation: 'sheer-SHAH-sa-na',
          benefit: 'Increases brain oxygen', 
          imageUrl: 'https://github.com/albindavidc/Arogya-Resources/blob/1b7a41ab7d6c9d7036c20a0bed0f4bd229993a43/public/women/inversion-poses/Sirsasana/1.png?raw=true',
          imageUrls: [
            'https://github.com/albindavidc/Arogya-Resources/blob/1b7a41ab7d6c9d7036c20a0bed0f4bd229993a43/public/women/inversion-poses/Sirsasana/1.png?raw=true',
            'https://github.com/albindavidc/Arogya-Resources/blob/1b7a41ab7d6c9d7036c20a0bed0f4bd229993a43/public/women/inversion-poses/Sirsasana/2.png?raw=true',
            'https://github.com/albindavidc/Arogya-Resources/blob/1b7a41ab7d6c9d7036c20a0bed0f4bd229993a43/public/women/inversion-poses/Sirsasana/3.png?raw=true',
            'https://github.com/albindavidc/Arogya-Resources/blob/1b7a41ab7d6c9d7036c20a0bed0f4bd229993a43/public/women/inversion-poses/Sirsasana/4.png?raw=true'
          ],
          imageUrlMale: 'https://github.com/albindavidc/Arogya-Resources/blob/main/public/men/inversion-poses/Sirsasana/1.png?raw=true',
          imageUrlsMale: [
            'https://github.com/albindavidc/Arogya-Resources/blob/main/public/men/inversion-poses/Sirsasana/1.png?raw=true',
            'https://github.com/albindavidc/Arogya-Resources/blob/main/public/men/inversion-poses/Sirsasana/2.png?raw=true',
            'https://github.com/albindavidc/Arogya-Resources/blob/main/public/men/inversion-poses/Sirsasana/3.png?raw=true',
            'https://github.com/albindavidc/Arogya-Resources/blob/main/public/men/inversion-poses/Sirsasana/4.png?raw=true'
          ],
          howToDo: [
            "Kneel on the floor and interlock your fingers to create a cup with your hands.",
            "Place your forearms and the crown of your head on the floor, cupping the back of your head with your hands.",
            "Lift your knees off the floor and walk your feet closer to your head.",
            "Slowly lift your feet off the floor, one at a time or together, and extend your legs upwards.",
            "Keep your core engaged and body in a straight line."
          ],
          frequency: [
            { level: 'Beginner', duration: 'Up to 30 secs (with wall support)', sets: '1', reps: '1', frequency: 'Once daily' },
            { level: 'Intermediate', duration: '1-2 minutes', sets: '1', reps: '1', frequency: 'Once daily' },
            { level: 'Advanced', duration: '3-5 minutes', sets: '1', reps: '1', frequency: 'Once or twice daily' }
          ],
          why: [
            "Brain & Nervous System: Increases blood flow to the brain, enhancing focus, memory, and mental clarity. Reduces stress & anxiety.",
            "Hormones & Energy: Stimulates pituitary and pineal glands, improving energy levels, mood, and metabolism.",
            "Strength: Builds strength in the core, shoulders, and arms."
          ]
        },
        { 
          sanskritName: 'Halasana', 
          englishName: 'Plow Pose',
          pronunciation: 'hah-LAHS-anna',
          benefit: 'Boosts digestion & metabolism', 
          imageUrl: 'https://www.theyogacollective.com/wp-content/uploads/2019/11/halasana-e1573741174986.jpg',
          howToDo: [
            "From Shoulder Stand, slowly lower your legs over your head.",
            "Attempt to touch your toes to the floor behind your head.",
            "Keep your back straight and supported with your hands.",
            "You can interlace your fingers on the floor behind your back for a deeper stretch."
          ],
          frequency: [
            { level: 'Beginner', duration: '30-60 seconds', sets: '1', reps: '1', frequency: 'Once daily during practice' },
            { level: 'Intermediate', duration: '1-3 minutes', sets: '1', reps: '1', frequency: 'Once daily during practice' },
            { level: 'Advanced', duration: '3-5 minutes', sets: '1', reps: '1', frequency: 'Once daily during practice' }
          ],
          why: [
            "Digestion: Massages abdominal organs, improving digestion and boosting metabolism.",
            "Spinal Health: Gives a deep stretch to the spine and shoulders.",
            "Calming: Reduces stress and fatigue."
          ]
        },
        { 
          sanskritName: 'Viparita Karani', 
          englishName: 'Legs-Up-the-Wall',
          pronunciation: 'vip-par-ee-tah kar-AHN-ee',
          benefit: 'Reduces fatigue, restores energy', 
          imageUrl: 'https://www.rishikulyogshalarishikesh.com/blog/wp-content/uploads/2024/09/Legs-Up-the-Wall-Pose-1024x958.jpg',
          howToDo: [
            "Sit with your side against a wall.",
            "Gently swing your legs up the wall as you lie down on your back.",
            "Adjust your position so your sitting bones are as close to the wall as comfortable.",
            "Relax your arms out to the sides, palms up. Breathe deeply."
          ],
          frequency: [
            { level: 'Beginner', duration: '5 minutes', sets: '1', reps: '1', frequency: 'Once daily, ideal before bed' },
            { level: 'Intermediate', duration: '10 minutes', sets: '1', reps: '1', frequency: 'Once daily, ideal before bed' },
            { level: 'Advanced', duration: '15 minutes', sets: '1', reps: '1', frequency: 'Once daily, ideal before bed' }
          ],
          why: [
            "Restoration: Calms the nervous system, reduces fatigue and restores energy.",
            "Circulation: Alleviates swollen ankles and feet by reversing blood flow.",
            "Stress Relief: Excellent for reducing anxiety and promoting relaxation."
          ]
        },
      ],
    },
    {
      id: 'backbends',
      title: 'Backbends',
      description: 'Activate thyroid, adrenal & nervous system. Backbends open the chest for more oxygen and more energy.',
      poses: [
        { 
          sanskritName: 'Bhujangasana', 
          englishName: 'Cobra Pose',
          pronunciation: 'boo-jun-GAHS-anna',
          benefit: 'Energizes the spine', 
          imageUrl: 'https://rishikeshashtangayogaschool.com/blog/wp-content/uploads/2021/11/cobra-pose_11zon.jpg',
          howToDo: [
            "Lie on your stomach with your forehead on the floor, legs together.",
            "Place your hands under your shoulders, fingers pointing forward.",
            "Inhale and lift your head, chest, and abdomen, keeping your navel on the floor.",
            "Keep your shoulders relaxed and away from your ears. Look slightly upward."
          ],
          frequency: [
            { level: 'Beginner', duration: '15 seconds', sets: '2', reps: '1 per set', frequency: 'Once daily during practice' },
            { level: 'Intermediate', duration: '20-25 seconds', sets: '2-3', reps: '1 per set', frequency: 'Once daily during practice' },
            { level: 'Advanced', duration: '30 seconds', sets: '3', reps: '1 per set', frequency: 'Once daily during practice' }
          ],
          why: [
            "Spinal Strength: Strengthens the spine and increases its flexibility.",
            "Energy Boost: Opens the chest and lungs, invigorating the body and reducing fatigue.",
            "Stress Relief: Soothes the adrenal glands and reduces stress."
          ]
        },
        { 
          sanskritName: 'Urdhva Mukha Svanasana', 
          englishName: 'Upward Facing Dog',
          pronunciation: 'OORD-vah MOO-kah shvah-NAHS-anna',
          benefit: 'Opens chest and lungs', 
          imageUrl: 'https://cdn.yogajournal.com/wp-content/uploads/2021/12/Upward-Facing-Dog_Andrew-Clark.jpg',
          howToDo: [
            "Lie face down. Place hands alongside your body near your lower ribs.",
            "Inhale and press through your hands, lifting your torso and legs a few inches off the floor.",
            "Engage your leg muscles and keep thighs lifted. Look forward or slightly up.",
            "The tops of your feet and your hands are the only points of contact with the floor."
          ],
          frequency: [
            { level: 'Beginner', duration: '15 seconds', sets: '3-5', reps: '1 per set', frequency: 'As part of a flow' },
            { level: 'Intermediate', duration: '20-25 seconds', sets: '3-5', reps: '1 per set', frequency: 'As part of a flow' },
            { level: 'Advanced', duration: '30 seconds', sets: '3-5', reps: '1 per set', frequency: 'As part of a flow' }
          ],
          why: [
            "Posture: Improves posture by strengthening back muscles and opening the chest.",
            "Stimulation: Stimulates abdominal organs and improves digestion.",
            "Mood Lift: Energizes the body and helps alleviate mild depression."
          ]
        },
        { 
          sanskritName: 'Dhanurasana', 
          englishName: 'Bow Pose',
          pronunciation: 'don-your-AHS-anna',
          benefit: 'Powerful metabolic booster', 
          imageUrl: 'https://www.theyogacollective.com/wp-content/uploads/2019/10/AdobeStock_193776647-1-1200x800.jpeg',
          howToDo: [
            "Lie on your stomach. Bend your knees and hold your ankles.",
            "Inhale and lift your chest and thighs off the floor, pulling your ankles.",
            "Look forward, keeping your neck long. Your body should resemble a bow.",
            "Breathe steadily while holding the pose."
          ],
          frequency: [
            { level: 'Beginner', duration: '15-20 seconds', sets: '1-2', reps: '1 per set', frequency: 'Once daily during practice' },
            { level: 'Intermediate', duration: '25 seconds', sets: '2', reps: '1 per set', frequency: 'Once daily during practice' },
            { level: 'Advanced', duration: '30 seconds', sets: '2', reps: '1 per set', frequency: 'Once daily during practice' }
          ],
          why: [
            "Metabolism: Massages the entire digestive tract, boosting metabolism and aiding weight loss.",
            "Flexibility: Stretches the entire front of the body, including the chest, abdomen, and thighs.",
            "Energy: A powerful pose that invigorates and energizes the entire body."
          ]
        },
        { 
          sanskritName: 'Chakrasana', 
          englishName: 'Wheel Pose',
          pronunciation: 'chak-RAHS-anna',
          benefit: 'Energizes entire body', 
          imageUrl: 'https://fitsri.com/wp-content/uploads/2020/10/how-to-do-chakrasana-1024x683.jpg',
          howToDo: [
            "Lie on your back with knees bent, feet flat on the floor close to your hips.",
            "Place your hands on the floor by your ears, fingers pointing towards your feet.",
            "Inhale and press into your hands and feet, lifting your hips and then your torso off the floor.",
            "Allow your head to hang gently. Straighten arms and legs as much as possible."
          ],
          frequency: [
            { level: 'Beginner', duration: '3-5 breaths (Bridge Pose)', sets: '2', reps: '1 per set', frequency: 'Once daily during practice' },
            { level: 'Intermediate', duration: '5-8 breaths', sets: '2-3', reps: '1 per set', frequency: 'Once daily during practice' },
            { level: 'Advanced', duration: '10+ breaths', sets: '3', reps: '1 per set', frequency: 'Once daily during practice' }
          ],
          why: [
            "Full Body Energy: Opens up the entire body, providing a massive energy boost.",
            "Strength: Builds strength in the legs, arms, spine, and abdomen.",
            "Heart Opener: Stretches the chest and lungs, increasing oxygen intake."
          ]
        },
      ],
    },
     {
      id: 'twists',
      title: 'Twisting Poses',
      description: 'Improve digestion + detox. Twists massage the digestive organs for better metabolism.',
      poses: [
        { 
          sanskritName: 'Ardha Matsyendrasana', 
          englishName: 'Half Spinal Twist',
          pronunciation: 'ARD-hah mahts-yen-DRAHS-anna',
          benefit: 'Stimulates liver and kidneys', 
          imageUrl: 'https://www.keralatourism.org/images/yoga/static-banner/large/Ardha_Matsyendrasana_-_The_Spinal_Twist-07032020173900.jpg',
          howToDo: [
            "Sit with legs extended. Bend your right knee and place the foot outside your left thigh.",
            "Bend your left knee and bring the foot near your right hip.",
            "Inhale and lengthen your spine. Exhale and twist towards the right.",
            "Place your right hand on the floor behind you and bring your left elbow to the outside of your right knee."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily, ideally after practice' },
            { level: 'Intermediate', duration: '45 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily, ideally after practice' },
            { level: 'Advanced', duration: '60 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily, ideally after practice' }
          ],
          why: [
            "Detoxification: Massages abdominal organs like the liver and kidneys, aiding in detox.",
            "Digestion: Improves digestive function and relieves constipation.",
            "Spinal Mobility: Increases the flexibility of the spine."
          ]
        },
        { 
          sanskritName: 'Bharadvajasana', 
          englishName: 'Seated Twist',
          pronunciation: 'bah-rahd-vah-JAHS-anna',
          benefit: 'Improves digestive health', 
          imageUrl: 'https://omstars.com/blog/wp-content/uploads/2021/09/Bharadvajasana.png',
          howToDo: [
            "Sit on the floor with legs straight out.",
            "Shift your weight onto your right buttock, bend your knees, and swing your legs to the left.",
            "Inhale to lengthen your spine. Exhale and twist your torso to the right.",
            "Place your right hand on the floor behind you and your left hand on your right thigh."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily during practice' },
            { level: 'Intermediate', duration: '45 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily during practice' },
            { level: 'Advanced', duration: '60 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily during practice' }
          ],
          why: [
            "Organ Health: Stimulates the digestive organs and improves metabolism.",
            "Pain Relief: Can relieve lower backache, neck pain, and sciatica.",
            "Flexibility: Stretches the spine, shoulders, and hips."
          ]
        },
        { 
          sanskritName: 'Marichyasana C', 
          englishName: 'Marichi\'s Twist',
          pronunciation: 'mah-ree-chee-AHS-anna C',
          benefit: 'Massages abdominal organs', 
          imageUrl: 'https://www.vinyasayogaashram.com/blog/wp-content/uploads/2023/10/marichyasana.jpg',
          howToDo: [
            "Sit with your left leg extended. Bend your right knee and place the foot on the floor, close to your inner left thigh.",
            "Exhale and twist to the right. Wrap your left arm around your right leg.",
            "Place your right fingertips on the floor behind you.",
            "For a deeper bind, clasp your hands behind your back."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily during practice' },
            { level: 'Intermediate', duration: '45 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily during practice' },
            { level: 'Advanced', duration: '60 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily during practice' }
          ],
          why: [
            "Detox & Digestion: Massages abdominal organs, including the liver and spleen, to improve function.",
            "Energy: Energizes the spine and nervous system.",
            "Mindfulness: Helps to calm the mind and reduce stress."
          ]
        },
      ],
    },
    {
      id: 'standing',
      title: 'Standing & Power Poses',
      description: 'Increase heat + burn calories. These dynamic poses build strength and stamina.',
      poses: [
        { 
          sanskritName: 'Virabhadrasana I', 
          englishName: 'Warrior 1',
          pronunciation: 'veer-ah-bah-DRAHS-anna one',
          benefit: 'Builds strength and confidence', 
          imageUrl: 'https://www.theyogacollective.com/wp-content/uploads/2019/10/Warrior-1-for-Pose-Page-1200x800.jpeg',
          howToDo: [
            "Step your feet wide apart, about 4 feet.",
            "Turn your right foot out 90 degrees and your left foot in slightly.",
            "Bend your right knee over your right ankle, keeping your back leg straight.",
            "Raise your arms overhead, palms facing each other or together. Gaze forward."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily during practice' },
            { level: 'Intermediate', duration: '45 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily during practice' },
            { level: 'Advanced', duration: '60 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily during practice' }
          ],
          why: [
            "Strength: Builds strength in your legs, core, and shoulders.",
            "Stamina: Increases endurance and stamina.",
            "Focus: Develops concentration and confidence."
          ]
        },
        { 
          sanskritName: 'Virabhadrasana II', 
          englishName: 'Warrior 2',
          pronunciation: 'veer-ah-bah-DRAHS-anna two',
          benefit: 'Improves balance and concentration', 
          imageUrl: 'https://liforme.com/cdn/shop/articles/0019_Warrior_II_-_Virabhadrasana_II_08_Laruga_31ba9e6e-26d7-42d2-b673-724fbd06a4f5.jpg',
          howToDo: [
            "From Warrior 1 stance, open your arms parallel to the floor.",
            "Keep your front knee bent directly over the ankle.",
            "Turn your head to look out over your front fingertips.",
            "Keep your torso centered over your hips."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily during practice' },
            { level: 'Intermediate', duration: '45 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily during practice' },
            { level: 'Advanced', duration: '60 secs per side', sets: '1 per side', reps: '1', frequency: 'Once daily during practice' }
          ],
          why: [
            "Hip Opener: Stretches the hips, groin, and shoulders.",
            "Balance: Improves balance and stability.",
            "Power: Cultivates a sense of power and focus."
          ]
        },
        { 
          sanskritName: 'Utkatasana', 
          englishName: 'Chair Pose',
          pronunciation: 'oot-kah-TAHS-anna',
          benefit: 'Boosts calorie burn', 
          imageUrl: 'https://omstars.com/blog/wp-content/uploads/2022/07/how-to-do-Utkatasana.png',
          howToDo: [
            "Stand with your feet together or hip-width apart.",
            "Inhale and raise your arms overhead.",
            "Exhale and bend your knees, as if sitting back into an imaginary chair.",
            "Keep your thighs as parallel to the floor as possible. Keep your core engaged."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 seconds', sets: '1-2', reps: '1 per set', frequency: 'Once daily during practice' },
            { level: 'Intermediate', duration: '45 seconds', sets: '2', reps: '1 per set', frequency: 'Once daily during practice' },
            { level: 'Advanced', duration: '60 seconds', sets: '2-3', reps: '1 per set', frequency: 'Once daily during practice' }
          ],
          why: [
            "Heat Building: Creates internal heat, boosting metabolism and calorie burn.",
            "Strength: Strengthens the ankles, thighs, calves, and spine.",
            "Stimulation: Stimulates the heart and abdominal organs."
          ]
        },
        { 
          sanskritName: 'Surya Namaskar', 
          englishName: 'Sun Salutation',
          pronunciation: 'SOOR-yah nah-mahs-KAR',
          benefit: 'Best for metabolism', 
          imageUrl: 'https://www.siddhiyoga.com/cdn-cgi/image/width=866,format=auto/https://www.siddhiyoga.com/wp-content/uploads/2019/08/sun-salutation-12-steps.jpg',
          howToDo: [
            "A sequence of 12 poses flowing from one to the next.",
            "Start in Mountain Pose, flow through poses like Forward Fold, Lunge, Plank, Cobra/Upward Dog, and Downward Dog.",
            "Coordinate each movement with an inhale or an exhale.",
            "The sequence warms up the entire body."
          ],
          frequency: [
            { level: 'Beginner', sets: '1', reps: '3-5 rounds', frequency: 'Once daily, ideal in the morning' },
            { level: 'Intermediate', sets: '1', reps: '6-8 rounds', frequency: 'Once daily, ideal in the morning' },
            { level: 'Advanced', sets: '1', reps: '10-12+ rounds', frequency: 'Once or twice daily, morning & evening' }
          ],
          why: [
            "Metabolism: The best all-around practice for boosting metabolism and warming up the body.",
            "Cardiovascular Health: Provides a good cardiovascular workout.",
            "Full Body Workout: Stretches and strengthens all major muscle groups."
          ]
        },
      ],
    },
    {
      id: 'core',
      title: 'Core & Abdominal Poses',
      description: 'Strengthen digestive fire. A strong core supports a healthy digestive system.',
      poses: [
        { 
          sanskritName: 'Navasana', 
          englishName: 'Boat Pose',
          pronunciation: 'nah-VAHS-anna',
          benefit: 'Strengthens abs and spine', 
          imageUrl: 'https://cdn.prod.website-files.com/67691f03eb5bfa3289b3dae7/67691f03eb5bfa3289b3ea9b_boat-pose-yoga.jpeg',
          howToDo: [
            "Sit on the floor with your knees bent.",
            "Lean back slightly and lift your feet off the floor, keeping your shins parallel to the ground (Half Boat).",
            "For Full Boat, straighten your legs to a 45-degree angle.",
            "Extend your arms forward, parallel to the floor. Keep your chest lifted."
          ],
          frequency: [
            { level: 'Beginner', duration: '15-20 secs (knees bent)', sets: '2', reps: '1 per set', frequency: 'Once daily during practice' },
            { level: 'Intermediate', duration: '30-45 seconds', sets: '2-3', reps: '1 per set', frequency: 'Once daily during practice' },
            { level: 'Advanced', duration: '60 seconds (Full Boat)', sets: '3', reps: '1 per set', frequency: 'Once daily during practice' }
          ],
          why: [
            "Digestive Fire: Tones and strengthens the abdominal muscles, stimulating 'Agni' (digestive fire).",
            "Core Strength: Builds deep core strength, which supports a healthy back.",
            "Balance: Improves balance and focus."
          ]
        },
        { 
          sanskritName: 'Kumbhakasana', 
          englishName: 'Plank Pose',
          pronunciation: 'koom-bahk-AHS-anna',
          benefit: 'Tones all core muscles', 
          imageUrl: 'https://cdn.yogajournal.com/wp-content/uploads/2021/05/Plank-Pose_Andrew-Clark_2400x1350.jpeg',
          howToDo: [
            "Start on your hands and knees.",
            "Step your feet back, one at a time, to bring your body into a straight line from head to heels.",
            "Your hands should be directly under your shoulders.",
            "Engage your core and glutes. Don't let your hips sag or rise."
          ],
          frequency: [
            { level: 'Beginner', duration: '20-30 seconds', sets: '2', reps: '1 per set', frequency: 'Once daily during practice' },
            { level: 'Intermediate', duration: '45-60 seconds', sets: '2-3', reps: '1 per set', frequency: 'Once daily during practice' },
            { level: 'Advanced', duration: '90+ seconds', sets: '3', reps: '1 per set', frequency: 'Once daily during practice' }
          ],
          why: [
            "Full Body Toning: Tones the entire core, as well as the arms, wrists, and spine.",
            "Metabolism: Builds muscle, which helps to increase resting metabolic rate.",
            "Foundation: A foundational pose for building strength for more advanced postures."
          ]
        },
        { 
          sanskritName: 'Paripurna Navasana', 
          englishName: 'Full Boat Pose',
          pronunciation: 'par-ee-POOR-nah nah-VAHS-anna',
          benefit: 'Deepens core engagement', 
          imageUrl: 'https://cdn.yogajournal.com/wp-content/uploads/2021/10/Boat-Pose_Andrew-Clark_2400x1350.jpeg',
          howToDo: [
            "This is the full expression of Navasana.",
            "From a seated position, lift your legs until they are straight and at a 45-degree angle.",
            "Keep your torso lifted to form a 'V' shape with your legs.",
            "Extend arms forward. Keep breathing deeply."
          ],
          frequency: [
            { level: 'Beginner', duration: '15-20 seconds', sets: '2', reps: '1 per set', frequency: 'Once daily during practice' },
            { level: 'Intermediate', duration: '25-30 seconds', sets: '2-3', reps: '1 per set', frequency: 'Once daily during practice' },
            { level: 'Advanced', duration: '30-45 seconds', sets: '3', reps: '1 per set', frequency: 'Once daily during practice' }
          ],
          why: [
            "Intense Core Work: Deeply strengthens the abdominal muscles and hip flexors.",
            "Digestion: Stimulates the intestines and improves digestion.",
            "Confidence: Builds determination and self-confidence."
          ]
        },
      ],
    },
    {
      id: 'pranayama',
      title: 'Pranayama',
      description: 'Breathing that boosts metabolism. These are not poses but are essential for energy.',
      poses: [
        { 
          sanskritName: 'Kapalbhati', 
          englishName: 'Skull Shining Breath',
          pronunciation: 'kah-pahl-BAH-tee',
          benefit: 'Increases metabolic rate', 
          imageUrl: 'https://shivohamyogaschool.com/wp-content/uploads/2022/01/How-To-Do-Kapalbhati-Pranayama.jpg',
          howToDo: [
            "Sit in a comfortable position with a straight spine.",
            "Inhale passively and exhale forcefully by drawing your abdominal muscles in sharply.",
            "The inhale is a natural recoil. Focus on the sharp, quick exhale.",
            "Start with one round of 20-30 breaths."
          ],
          frequency: [
            { level: 'Beginner', sets: '1 round', reps: '30 breaths', frequency: 'Once daily, on an empty stomach' },
            { level: 'Intermediate', sets: '2 rounds', reps: '50-60 breaths', frequency: 'Once daily, on an empty stomach' },
            { level: 'Advanced', sets: '3 rounds', reps: '60-100 breaths', frequency: 'Once daily, on an empty stomach' }
          ],
          why: [
            "Metabolism Boost: The rapid breathing increases the metabolic rate and generates internal heat.",
            "Detoxification: Cleanses the lungs and nasal passages.",
            "Energy: Quickly energizes the mind and body."
          ]
        },
        { 
          sanskritName: 'Bhastrika', 
          englishName: 'Bellows Breath',
          pronunciation: 'bhas-TREE-kah',
          benefit: 'Boosts energy instantly', 
          imageUrl: 'https://www.flexifyme.com/blogs/wp-content/uploads/2025/07/Bhramari-Pranayama.png',
          howToDo: [
            "Sit comfortably with a straight spine.",
            "Inhale and exhale forcefully and equally through your nose.",
            "The movement should come from your diaphragm, like pumping a bellow.",
            "Keep your head, neck, and shoulders still."
          ],
          frequency: [
            { level: 'Beginner', sets: '1 round', reps: '10 breaths', frequency: 'Once daily, on an empty stomach' },
            { level: 'Intermediate', sets: '2 rounds', reps: '15 breaths', frequency: 'Once daily, on an empty stomach' },
            { level: 'Advanced', sets: '3 rounds', reps: '20 breaths', frequency: 'Once daily, on an empty stomach' }
          ],
          why: [
            "Instant Energy: Massively increases prana (life force energy), providing an instant energy lift.",
            "Clarity: Clears the mind and sharpens focus.",
            "Metabolism: Stirs up metabolic processes in the body."
          ]
        },
        { 
          sanskritName: 'Ujjayi Breath', 
          englishName: 'Victorious Breath',
          pronunciation: 'oo-JAH-yee breath',
          benefit: 'Activates thyroid & warms the body', 
          imageUrl: 'https://d5sbbf6usl3xq.cloudfront.net/ujjayi_yoga.png',
          howToDo: [
            "Breathe in and out through your nose.",
            "Slightly constrict the back of your throat, creating a soft 'ocean' or 'hissing' sound.",
            "The sound should be audible to you but not loud.",
            "Keep the breath long, smooth, and even."
          ],
          frequency: [
            { level: 'Beginner', duration: '2-3 mins seated', frequency: 'Use throughout yoga or anytime' },
            { level: 'Intermediate', duration: '5 mins seated', frequency: 'Use throughout yoga or anytime' },
            { level: 'Advanced', duration: '10+ mins for meditation', frequency: 'Use throughout yoga or anytime' }
          ],
          why: [
            "Internal Heat: The friction of the breath warms the body from the inside out, activating the thyroid.",
            "Calm Focus: Calms the nervous system and helps to focus the mind.",
            "Stamina: Increases oxygenation and improves endurance during practice."
          ]
        },
      ],
    },
  ]);

  readonly allPoses = computed(() => this.poseCategories().flatMap(c => c.poses));
  
  selectedPoseIndex = signal<number | null>(null);

  readonly selectedPose = computed(() => {
    const index = this.selectedPoseIndex();
    const poses = this.allPoses();
    if (index === null || index < 0 || index >= poses.length) {
      return null;
    }
    return poses[index];
  });


  readonly topPoses = signal<Pose[]>(this.poseCategories().flatMap(c => c.poses).filter(p => [
      'Sarvangasana', 'Surya Namaskar', 'Navasana', 'Kapalbhati', 'Dhanurasana'
    ].includes(p.sanskritName)));

  setGender(gender: 'female' | 'male') {
    this.selectedGender.set(gender);
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  openModal(pose: Pose) {
    const index = this.allPoses().findIndex(p => p.sanskritName === pose.sanskritName);
    if (index !== -1) {
      this.selectedPoseIndex.set(index);
    }
  }

  closeModal() {
    this.selectedPoseIndex.set(null);
  }

  goToNextPose() {
    const currentIndex = this.selectedPoseIndex();
    if (currentIndex !== null) {
      const totalPoses = this.allPoses().length;
      const nextIndex = (currentIndex + 1) % totalPoses;
      this.selectedPoseIndex.set(nextIndex);
    }
  }

  goToPreviousPose() {
    const currentIndex = this.selectedPoseIndex();
    if (currentIndex !== null) {
      const totalPoses = this.allPoses().length;
      const prevIndex = (currentIndex - 1 + totalPoses) % totalPoses;
      this.selectedPoseIndex.set(prevIndex);
    }
  }
}