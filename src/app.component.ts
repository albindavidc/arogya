import { ChangeDetectionStrategy, Component, signal, computed, effect, inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PoseCategory, Pose } from './models/pose.model';
import { PoseDetailModalComponent } from './pose-detail-modal.component';
import { WarmUpComponent } from './warm-up.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PoseDetailModalComponent, WarmUpComponent],
})
export class AppComponent {
  private renderer = inject(Renderer2);
  // FIX: Explicitly type `document` to resolve type inference issue.
  private document: Document = inject(DOCUMENT);

  selectedGender = signal<'female' | 'male'>('female');
  showWarmUpView = signal(false);

  // --- Pranayama Data ---
  // Reordered: Core Essentials first, then Logical Progression
  readonly breathingTechniques = [
    // --- CATEGORY: Core Essentials (Daily Practice) ---
    { 
      category: 'Core Essentials (Daily Practice)',
      name: 'Diaphragmatic Breathing (Belly Breathing)', 
      ratio: 'Natural', 
      level: 'Beginner', 
      sequence: '<strong>Nose</strong> → <strong>Belly</strong> expands → <strong>Belly</strong> contracts → <strong>Nose</strong>', 
      benefits: 'Foundation practice, activates diaphragm, reduces stress' 
    },
    { 
      category: 'Core Essentials (Daily Practice)',
      name: 'Ujjayi Breath (Ocean Breath)', 
      ratio: '4:4 or Natural', 
      level: 'Beginner', 
      sequence: '<strong>Nose</strong> → <strong>Throat</strong> constriction → <strong>Lungs</strong> → <strong>Throat</strong> constriction → <strong>Nose</strong>', 
      benefits: 'Builds heat, enhances focus, used in asana practice' 
    },
    { 
      category: 'Core Essentials (Daily Practice)',
      name: 'Nadi Shodhana (Alternate Nostril)', 
      ratio: '4:4 / 4:4:4', 
      level: 'Beg-Adv', 
      sequence: '<strong>Right Nose</strong> → <strong>Lungs</strong> → <strong>Hold</strong> → <strong>Left Nose</strong> | <strong>Left Nose</strong> → <strong>Lungs</strong> → <strong>Hold</strong> → <strong>Right Nose</strong>', 
      benefits: 'Balances brain hemispheres, clears nadis' 
    },
    { 
      category: 'Core Essentials (Daily Practice)',
      name: 'Kapalabhati (Skull Shining)', 
      ratio: 'Rapid passive/active', 
      level: 'Advanced', 
      sequence: '<strong>Nose</strong> (passive) → <strong>Belly contracts</strong> (forced) → <strong>Repeat</strong>', 
      benefits: 'Cleanses respiratory system, energizes, clears mind' 
    },
    { 
      category: 'Core Essentials (Daily Practice)',
      name: 'Bhastrika (Bellows Breath)', 
      ratio: '1:1 rapid', 
      level: 'Advanced', 
      sequence: '<strong>Nose</strong> (Forced In) → <strong>Nose</strong> (Forced Out) → <strong>Equal 1:1 Rhythm</strong>', 
      benefits: 'Generates heat, increases prana, clears nadis' 
    },
    { 
      category: 'Core Essentials (Daily Practice)',
      name: 'Bhramari (Bee Breath)', 
      ratio: 'Natural', 
      level: 'Intermediate', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> → <strong>Humming vibration</strong> → <strong>Nose</strong>', 
      benefits: 'Calms mind instantly, reduces anxiety and anger' 
    },
    { 
      category: 'Core Essentials (Daily Practice)',
      name: 'Box Breathing (Sama Vritti Kumbhaka)', 
      ratio: '4:4:4:4', 
      level: 'Intermediate', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (4) → <strong>Hold in</strong> (4) → <strong>Nose</strong> (4) → <strong>Hold empty</strong> (4)', 
      benefits: 'Tactical breathing, enhances focus and calm' 
    },

    // --- CATEGORY: The Complete Sequence (Foundational -> Advanced) ---
    
    // Foundational Awareness
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Clavicular Breathing (Upper Chest)', 
      ratio: 'Natural', 
      level: 'Beginner', 
      sequence: '<strong>Nose</strong> → <strong>Upper chest</strong> rises → <strong>Upper chest</strong> falls → <strong>Nose</strong>', 
      benefits: 'Awareness of upper lung breathing, completes full yogic breath' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Three-Part Breath (Dirga)', 
      ratio: 'Natural', 
      level: 'Beginner', 
      sequence: '<strong>Nose</strong> → <strong>Belly</strong> → <strong>Ribs</strong> → <strong>Chest</strong> → <strong>Hold</strong> → <strong>Chest</strong> → <strong>Ribs</strong> → <strong>Belly</strong> → <strong>Nose</strong>', 
      benefits: 'Full lung expansion, complete breath awareness' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Equal (Sama Vritti)', 
      ratio: '4:4', 
      level: 'Beginner', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (4 counts) → <strong>Lungs</strong> → <strong>Nose</strong> (4 counts)', 
      benefits: 'Balances nervous system, calms mind' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Extended Exhale', 
      ratio: '4:6 / 4:8', 
      level: 'Beginner', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (4 counts) → <strong>Lungs</strong> → <strong>Nose</strong> (6-8 counts)', 
      benefits: 'Activates parasympathetic, reduces anxiety' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Coherent Breathing', 
      ratio: '5:5', 
      level: 'Beg-Int', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (5 counts) → <strong>Lungs</strong> → <strong>Nose</strong> (5 counts)', 
      benefits: 'Improves heart rate variability, optimal breathing rate' 
    },
    
    // Balancing & Refinement
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Viloma (Interrupted Breath)', 
      ratio: 'Paused intervals', 
      level: 'Intermediate', 
      sequence: '<strong>Nose</strong> → <strong>Pause</strong> → <strong>Nose</strong> → <strong>Pause</strong> → <strong>Lungs full</strong> → ... → <strong>Empty</strong>', 
      benefits: 'Builds lung capacity, refines breath control' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Ratio Breathing', 
      ratio: '4:6, 5:7', 
      level: 'Intermediate', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (shorter) → <strong>Lungs</strong> → <strong>Nose</strong> (longer)', 
      benefits: 'Customizable nervous system regulation' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Anuloma Viloma', 
      ratio: '4:4 or varies', 
      level: 'Beg-Int', 
      sequence: '<strong>Both Nostrils</strong> → <strong>Lungs</strong> → <strong>Alternate nostril exhale</strong>', 
      benefits: 'Similar to Nadi Shodhana, balances energy channels' 
    },

    // Cooling & Heating (Temperature)
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Sitali (Cooling Breath)', 
      ratio: 'Natural', 
      level: 'Intermediate', 
      sequence: '<strong>Mouth</strong> (rolled tongue) → <strong>Lungs</strong> → <strong>Nose</strong>', 
      benefits: 'Cools body, reduces pitta, calms anger' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Sitkari/Sheetkari (Hissing Breath)', 
      ratio: 'Natural', 
      level: 'Intermediate', 
      sequence: '<strong>Mouth</strong> (clenched teeth) → <strong>Lungs</strong> → <strong>Nose</strong>', 
      benefits: 'Cooling effect, lowers blood pressure, alternative to Sitali' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Chandra Bhedana (Left Nostril)', 
      ratio: '4:4 or 4:8:4', 
      level: 'Int-Adv', 
      sequence: '<strong>Left Nose</strong> → <strong>Lungs</strong> → <strong>Hold</strong> → <strong>Right Nose</strong>', 
      benefits: 'Cools, calms, activates Ida nadi' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Surya Bhedana (Right Nostril)', 
      ratio: '4:4 or 4:8:4', 
      level: 'Int-Adv', 
      sequence: '<strong>Right Nose</strong> → <strong>Lungs</strong> → <strong>Hold</strong> → <strong>Left Nose</strong>', 
      benefits: 'Energizes, increases heat, activates Pingala nadi' 
    },

    // Kriyas & Prep
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Swana Pranayama (Panting Breath)', 
      ratio: 'Rapid', 
      level: 'Intermediate', 
      sequence: '<strong>Mouth</strong> (tongue out) → <strong>Rapid panting</strong> → <strong>Belly movement</strong>', 
      benefits: 'Preparation for Bhastrika and Kapalabhati' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Agnisara/Agnisar Kriya', 
      ratio: 'Bahir Kumbhaka', 
      level: 'Int-Adv', 
      sequence: '<strong>Nose</strong> → <strong>Exhale completely</strong> → <strong>Hold empty</strong> → <strong>Belly pumping</strong> → <strong>Nose</strong>', 
      benefits: 'Stimulates digestive fire, strengthens abdomen, detoxifies' 
    },

    // Advanced Retention & States
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Antar Kumbhaka (Internal Retention)', 
      ratio: '4:2:8 / 4:8:8', 
      level: 'Int-Adv', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (4) → <strong>Hold in</strong> (2-8) → <strong>Nose</strong> (8)', 
      benefits: 'Increases oxygen absorption, builds energy' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Bahya Kumbhaka/Bahya Pranayama', 
      ratio: '4:8:12 (1:2:3)', 
      level: 'Advanced', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (4) → <strong>Nose</strong> (8) → <strong>Hold empty</strong> (12) → <strong>3 Bandhas</strong>', 
      benefits: 'Deep relaxation, digestive health, reproductive system' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Classical Pranayama', 
      ratio: '1:4:2', 
      level: 'Advanced', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (1) → <strong>Hold in</strong> (4) → <strong>Nose</strong> (2)', 
      benefits: 'Traditional intensive practice, expert supervision required' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Murchha Pranayama (Swooning Breath)', 
      ratio: 'Extended retention', 
      level: 'Advanced', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (full) → <strong>Jalandhar Bandha</strong> → <strong>Hold</strong> → <strong>Nose</strong>', 
      benefits: 'Induces altered consciousness, advanced meditation state' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Plavini Pranayama (Floating Breath)', 
      ratio: 'Extended retention', 
      level: 'Advanced', 
      sequence: '<strong>Nose/Mouth</strong> → <strong>Swallow air</strong> → <strong>Stomach fills</strong> → <strong>Hold</strong> → <strong>Nose/Mouth</strong>', 
      benefits: 'Body lightness, advanced retention, buoyancy' 
    },

    // Spiritual / Mantra
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Udgitha/Udgeeth (OM Chanting)', 
      ratio: 'Natural, extended', 
      level: 'Intermediate', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> → <strong>OM chant</strong> → <strong>Nose/Mouth</strong>', 
      benefits: 'Meditation support, reduces stress, promotes spiritual connection' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Pranava Pranayama', 
      ratio: 'Natural', 
      level: 'Intermediate', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> → <strong>Mental OM</strong> → <strong>Nose</strong>', 
      benefits: 'Spontaneous breath awareness with mantra, meditative' 
    },
  ];

  readonly poseCategories = signal<PoseCategory[]>([
    {
      id: 'phase1',
      title: 'Phase 1: Warm-Up & Ignition',
      description: 'Standing & Power Poses. Build strength, increase heat, burn calories, and build stamina.',
      poses: [
        { 
          sanskritName: 'Surya Namaskar', 
          englishName: 'Sun Salutation',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'SOOR-yah nah-mahs-KAR',
          benefit: 'Best for metabolism', 
          pranayama: ['Ujjayi', 'Three-Part'],
          mudra: ['Pranamasana (Prayer)'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/special/surya-namaskar-transparent.png?raw=true',
          howToDo: [
            "A sequence of 12 poses flowing from one to the next.",
            "Start in Mountain Pose, flow through poses like Forward Fold, Lunge, Plank, Cobra/Upward Dog, and Downward Dog.",
            "Coordinate each movement with an inhale or an exhale.",
            "The sequence warms up the entire body."
          ],
          frequency: [
            { level: 'Beginner', sets: '1', reps: '3-5 rounds', frequency: 'Once daily' },
            { level: 'Intermediate', sets: '1', reps: '6-8 rounds', frequency: 'Once daily' },
            { level: 'Advanced', sets: '1', reps: '10-12+ rounds', frequency: 'Twice daily' }
          ],
          why: [
            "Metabolism: The best all-around practice for boosting metabolism and warming up the body.",
            "Cardiovascular Health: Provides a good cardiovascular workout.",
            "Full Body Workout: Stretches and strengthens all major muscle groups."
          ]
        },
        { 
          sanskritName: 'Virabhadrasana I', 
          englishName: 'Warrior 1',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'veer-ah-bah-DRAHS-anna I',
          benefit: 'Builds strength', 
          pranayama: ['Ujjayi', 'Three-Part'],
          mudra: ['Anjali Mudra'],
          imageUrl: 'https://www.theyogacollective.com/wp-content/uploads/2019/10/Warrior-1-for-Pose-Page-1200x800.jpeg',
          howToDo: [
            "Step your feet wide apart, about 4 feet.",
            "Turn your right foot out 90 degrees and your left foot in slightly.",
            "Bend your right knee over your right ankle, keeping your back leg straight.",
            "Raise your arms overhead, palms facing each other or together. Gaze forward."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '45 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60 secs/side', sets: '1', reps: '1', frequency: 'Daily' }
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
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'veer-ah-bah-DRAHS-anna II',
          benefit: 'Improves balance', 
          pranayama: ['Ujjayi'],
          mudra: ['Chin Mudra'],
          imageUrl: 'https://liforme.com/cdn/shop/articles/0019_Warrior_II_-_Virabhadrasana_II_08_Laruga_31ba9e6e-26d7-42d2-b673-724fbd06a4f5.jpg',
          howToDo: [
            "From Warrior 1 stance, open your arms parallel to the floor.",
            "Keep your front knee bent directly over the ankle.",
            "Turn your head to look out over your front fingertips.",
            "Keep your torso centered over your hips."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '45 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60 secs/side', sets: '1', reps: '1', frequency: 'Daily' }
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
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'oot-kah-TAHS-anna',
          benefit: 'Boosts calorie burn', 
          pranayama: ['Ujjayi', 'Bhastrika'],
          mudra: ['Anjali Mudra'],
          imageUrl: 'https://omstars.com/blog/wp-content/uploads/2022/07/how-to-do-Utkatasana.png',
          howToDo: [
            "Stand with your feet together or hip-width apart.",
            "Inhale and raise your arms overhead.",
            "Exhale and bend your knees, sitting back as if in an imaginary chair.",
            "Keep your thighs as parallel to the floor as possible. Keep your core engaged."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 seconds', sets: '1-2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '45 seconds', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60 seconds', sets: '2-3', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Heat Building: Creates internal heat, boosting metabolism and calorie burn.",
            "Strength: Strengthens the ankles, thighs, calves, and spine.",
            "Stimulation: Stimulates the heart and abdominal organs."
          ]
        },
      ],
    },
    {
      id: 'phase2',
      title: 'Phase 2: Core & Power Activation',
      description: 'Abdominal Poses. Strengthen digestive fire and support a healthy back.',
      poses: [
        { 
          sanskritName: 'Kumbhakasana', 
          englishName: 'Plank Pose',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'koom-bahk-AHS-anna',
          benefit: 'Tones core', 
          pranayama: ['Ujjayi', 'Kapalabhati'],
          mudra: ['Hasta Bandha'],
          imageUrl: 'https://cdn.yogajournal.com/wp-content/uploads/2021/05/Plank-Pose_Andrew-Clark_2400x1350.jpeg',
          howToDo: [
            "Start on your hands and knees.",
            "Step your feet back, one at a time, to bring your body into a straight line from head to heels.",
            "Your hands should be directly under your shoulders.",
            "Engage your core and glutes. Don't let your hips sag or rise."
          ],
          frequency: [
            { level: 'Beginner', duration: '20-30 secs', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '45-60 secs', sets: '2-3', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '90+ secs', sets: '3', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Full Body Toning: Tones the entire core, as well as the arms, wrists, and spine.",
            "Metabolism: Builds muscle, which helps to increase resting metabolic rate.",
            "Foundation: A foundational pose for building strength for more advanced postures."
          ]
        },
        { 
          sanskritName: 'Navasana', 
          englishName: 'Boat Pose',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'nah-VAHS-anna',
          benefit: 'Strengthens abs', 
          pranayama: ['Ujjayi', 'Bhastrika'],
          mudra: ['None'],
          imageUrl: 'https://cdn.prod.website-files.com/67691f03eb5bfa3289b3dae7/67691f03eb5bfa3289b3ea9b_boat-pose-yoga.jpeg',
          howToDo: [
            "Sit on the floor with your knees bent.",
            "Lean back slightly and lift your feet off the floor, keeping your shins parallel to the ground (Half Boat).",
            "For Full Boat, straighten your legs to a 45-degree angle.",
            "Extend your arms forward, parallel to the floor. Keep your chest lifted."
          ],
          frequency: [
            { level: 'Beginner', duration: '15-20 secs', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '30-45 secs', sets: '2-3', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60 secs', sets: '3', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Digestive Fire: Tones and strengthens the abdominal muscles, stimulating 'Agni' (digestive fire).",
            "Core Strength: Builds deep core strength, which supports a healthy back.",
            "Balance: Improves balance and focus."
          ]
        },
        { 
          sanskritName: 'Paripurna Navasana', 
          englishName: 'Full Boat Pose',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'par-ee-POOR-nah',
          benefit: 'Deepens core', 
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://cdn.yogajournal.com/wp-content/uploads/2021/10/Boat-Pose_Andrew-Clark_2400x1350.jpeg',
          howToDo: [
            "This is the full expression of Navasana.",
            "From a seated position, lift your legs until they are straight and at a 45-degree angle.",
            "Keep your torso lifted to form a 'V' shape with your legs.",
            "Extend arms forward. Keep breathing deeply."
          ],
          frequency: [
            { level: 'Beginner', duration: '15-20 secs', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '25-30 secs', sets: '2-3', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '30-45 secs', sets: '3', reps: '1', frequency: 'Daily' }
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
      id: 'phase3',
      title: 'Phase 3: Backbends (Energy Surge)',
      description: 'Activate thyroid, adrenal & nervous system. Open the chest for more oxygen and energy.',
      poses: [
        { 
          sanskritName: 'Bhujangasana', 
          englishName: 'Cobra Pose',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'boo-jun-GAHS-anna',
          benefit: 'Energizes spine', 
          pranayama: ['Diaphragmatic', 'Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://rishikeshashtangayogaschool.com/blog/wp-content/uploads/2021/11/cobra-pose_11zon.jpg',
          howToDo: [
            "Lie on your stomach with your forehead on the floor, legs together.",
            "Place your hands under your shoulders, fingers pointing forward.",
            "Inhale and lift your head, chest, and abdomen, keeping your navel on the floor.",
            "Keep your shoulders relaxed and away from your ears. Look slightly upward."
          ],
          frequency: [
            { level: 'Beginner', duration: '15 seconds', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '20-25 secs', sets: '2-3', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '30 seconds', sets: '3', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Spinal Strength: Strengthens the spine and increases its flexibility.",
            "Energy Boost: Opens the chest and lungs, invigorating the body and reducing fatigue.",
            "Stress Relief: Soothes the adrenal glands and reduces stress."
          ]
        },
        { 
          sanskritName: 'Urdhva Mukha Svanasana', 
          englishName: 'Upward Dog',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'OORD-vah MOO-kah',
          benefit: 'Opens chest', 
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://cdn.yogajournal.com/wp-content/uploads/2021/12/Upward-Facing-Dog_Andrew-Clark.jpg',
          howToDo: [
            "Lie face down. Place hands alongside your body near your lower ribs.",
            "Inhale and press through your hands, lifting your torso and legs a few inches off the floor.",
            "Engage your leg muscles and keep thighs lifted. Look forward or slightly up.",
            "The tops of your feet and your hands are the only points of contact with the floor."
          ],
          frequency: [
            { level: 'Beginner', duration: '15 seconds', sets: '3-5', reps: '1', frequency: 'In flow' },
            { level: 'Intermediate', duration: '20-25 secs', sets: '3-5', reps: '1', frequency: 'In flow' },
            { level: 'Advanced', duration: '30 seconds', sets: '3-5', reps: '1', frequency: 'In flow' }
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
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'don-your-AHS-anna',
          benefit: 'Metabolic booster', 
          pranayama: ['Diaphragmatic'],
          mudra: ['None'],
          imageUrl: 'https://www.theyogacollective.com/wp-content/uploads/2019/10/AdobeStock_193776647-1-1200x800.jpeg',
          howToDo: [
            "Lie on your stomach. Bend your knees and hold your ankles.",
            "Inhale and lift your chest and thighs off the floor, pulling your ankles.",
            "Look forward, keeping your neck long. Your body should resemble a bow.",
            "Breathe steadily while holding the pose."
          ],
          frequency: [
            { level: 'Beginner', duration: '15-20 secs', sets: '1-2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '25 seconds', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '30 seconds', sets: '2', reps: '1', frequency: 'Daily' }
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
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'chak-RAHS-anna',
          benefit: 'Energizes body', 
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://fitsri.com/wp-content/uploads/2020/10/how-to-do-chakrasana-1024x683.jpg',
          howToDo: [
            "Lie on your back with knees bent, feet flat on the floor close to your hips.",
            "Place your hands on the floor by your ears, fingers pointing towards your feet.",
            "Inhale and press into your hands and feet, lifting your hips and then your torso off the floor.",
            "Allow your head to hang gently. Straighten arms and legs as much as possible."
          ],
          frequency: [
            { level: 'Beginner', duration: '3-5 breaths', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '5-8 breaths', sets: '2-3', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '10+ breaths', sets: '3', reps: '1', frequency: 'Daily' }
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
      id: 'phase4',
      title: 'Phase 4: Inversions (Brain Nourishment)',
      description: 'Boost Metabolism + Brain Energy. Sharpen the mind, improve blood flow, and activate endocrine glands.',
      poses: [
        { 
          sanskritName: 'Sarvangasana', 
          englishName: 'Shoulder Stand',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'sar-van-GAHS-anna',
          benefit: 'Stimulates thyroid', 
          pranayama: ['Ujjayi', 'Diaphragmatic'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/sarvangasana/f-sarvangasana.png?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/sarvangasana/m-sarvangasana.png?raw=true',
          stepsImageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/sarvangasana/f-sarvangasana-steps.png?raw=true',
          stepsImageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/sarvangasana/m-sarvangasana-steps.png?raw=true',
          howToDo: [
            "Lie on your back with arms alongside your body, palms down.",
            "Inhale and lift your legs, hips, and back off the floor, using your hands to support your lower back.",
            "Raise your legs until they are perpendicular to the floor, keeping your torso straight.",
            "Press your sternum towards your chin. Hold the pose, breathing deeply."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 seconds', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '1 minute', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '2-3 minutes', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Thyroid Health: Stimulates the thyroid and parathyroid glands, regulating metabolism.",
            "Circulation: Improves blood flow to the brain and upper body.",
            "Calming: Soothes the nervous system, reducing stress and anxiety."
          ]
        },
        { 
          sanskritName: 'Halasana', 
          englishName: 'Plow Pose',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'hah-LAHS-anna',
          benefit: 'Boosts digestion', 
          pranayama: ['Ujjayi', 'Diaphragmatic'],
          mudra: ['Interlaced Fingers'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/halasana/f-halasana.png?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/halasana/m-halasana.png?raw=true',
          stepsImageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/halasana/f-halasana-steps.png?raw=true',
          stepsImageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/halasana/m-halasana-steps.png?raw=true',
          howToDo: [
            "From Shoulder Stand, slowly lower your legs over your head.",
            "Attempt to touch your toes to the floor behind your head.",
            "Keep your back straight and supported with your hands.",
            "You can interlace your fingers on the floor behind your back for a deeper stretch."
          ],
          frequency: [
            { level: 'Beginner', duration: '30-60 secs', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '1-3 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '3-5 mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Digestion: Massages abdominal organs, improving digestion and boosting metabolism.",
            "Spinal Health: Gives a deep stretch to the spine and shoulders.",
            "Calming: Reduces stress and fatigue."
          ]
        },
        { 
          sanskritName: 'Sirsasana', 
          englishName: 'Headstand',
          schedule: ['All'],
          pronunciation: 'sheer-SHAH-sa-na',
          benefit: 'Brain oxygen', 
          pranayama: ['Ujjayi', 'Equal'],
          mudra: ['Bound Hands'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/sirsasana/1.png?raw=true',
          imageUrls: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/sirsasana/1.png?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/sirsasana/2.png?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/sirsasana/3.png?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/sirsasana/4.png?raw=true'
          ],
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/sirsasana/1.png?raw=true',
          imageUrlsMale: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/sirsasana/1.png?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/sirsasana/2.png?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/sirsasana/3.png?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/sirsasana/4.png?raw=true'
          ],
          stepsImageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/sirsasana/f-steps.png?raw=true',
          stepsImageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/sirsasana/m-steps.png?raw=true',
          handImageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/sirsasana/f-hand.png?raw=true',
          handImageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/sirsasana/m-hand.png?raw=true',
          howToDo: [
            "Kneel on the floor and interlock your fingers to create a cup with your hands.",
            "Place your forearms and the crown of your head on the floor, cupping the back of your head with your hands.",
            "Lift your knees off the floor and walk your feet closer to your head.",
            "Slowly lift your feet off the floor, one at a time or together, and extend your legs upwards.",
            "Keep your core engaged and body in a straight line."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '1-2 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '3-5 mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Brain & Nervous System: Increases blood flow to the brain, enhancing focus, memory, and mental clarity. Reduces stress & anxiety.",
            "Hormones & Energy: Stimulates pituitary and pineal glands, improving energy levels, mood, and metabolism.",
            "Strength: Builds strength in the core, shoulders, and arms."
          ]
        },
        { 
          sanskritName: 'Pincha Mayurasana', 
          englishName: 'Feathered Peacock',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'pin-cha my-yur-AHS-anna',
          benefit: 'Shoulder strength', 
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/pincha-mayurasana/f-pincha.png?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/pincha-mayurasana/m-pincha.png?raw=true',
          stepsImageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/pincha-mayurasana/f-pincha-steps.png?raw=true',
          stepsImageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/pincha-mayurasana/m-pincha-steps.png?raw=true',
          imageUrls: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/pincha-mayurasana/f-pincha-warmup1.png?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversion-poses/pincha-mayurasana/f-pincha-warmup2.png?raw=true'
          ],
          imageUrlsMale: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/pincha-mayurasana/m-pincha-warmup1.png?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversion-poses/pincha-mayurasana/m-pincha-warmup2.png?raw=true'
          ],
          howToDo: [
            "Start on hands and knees. Place forearms on the floor, parallel to each other, shoulder-width apart.",
            "Tuck toes and lift hips high into Dolphin Pose.",
            "Walk feet in closer to elbows as much as possible, keeping the spine long.",
            "Lift one leg high towards the ceiling. Gently hop off the standing foot to bring both legs overhead.",
            "Squeeze legs together, engage core, and press down firmly through forearms. Gaze slightly forward."
          ],
          frequency: [
            { level: 'Beginner', duration: 'Dolphin 60s', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: 'Kick-up reps', sets: '10', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: 'Hold 60 secs', sets: '2-3', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Upper Body Strength: Builds tremendous strength in the shoulders, arms, and upper back.",
            "Balance & Focus: Requires and develops deep concentration and balance.",
            "Energy: Inversions increase blood flow to the brain, energizing the mind and relieving stress."
          ]
        },
        { 
          sanskritName: 'Viparita Karani', 
          englishName: 'Legs-Up-the-Wall',
          schedule: ['Sun'],
          pronunciation: 'vip-par-ee-tah kar-AHN-ee',
          benefit: 'Restores energy', 
          pranayama: ['Equal', 'Diaphragmatic'],
          mudra: ['Chin Mudra'],
          imageUrl: 'https://www.rishikulyogshalarishikesh.com/blog/wp-content/uploads/2024/09/Legs-Up-the-Wall-Pose-1024x958.jpg',
          howToDo: [
            "Sit with your side against a wall.",
            "Gently swing your legs up the wall as you lie down on your back.",
            "Adjust your position so your sitting bones are as close to the wall as comfortable.",
            "Relax your arms out to the sides, palms up. Breathe deeply."
          ],
          frequency: [
            { level: 'Beginner', duration: '5 minutes', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '10 minutes', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '15 minutes', sets: '1', reps: '1', frequency: 'Daily' }
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
      id: 'phase5',
      title: 'Phase 5: Twists (Neutralize & Detox)',
      description: 'Improve digestion + detox. Massages the digestive organs for better metabolism.',
      poses: [
        { 
          sanskritName: 'Ardha Matsyendrasana', 
          englishName: 'Half Spinal Twist',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'ARD-hah mahts-yen-DRAHS-anna',
          benefit: 'Stimulates liver', 
          pranayama: ['Diaphragmatic'],
          mudra: ['Abhaya Mudra'],
          imageUrl: 'https://www.keralatourism.org/images/yoga/static-banner/large/Ardha_Matsyendrasana_-_The_Spinal_Twist-07032020173900.jpg',
          howToDo: [
            "Sit with legs extended. Bend your right knee and place the foot outside your left thigh.",
            "Bend your left knee and bring the foot near your right hip.",
            "Inhale and lengthen your spine. Exhale and twist towards the right.",
            "Place your right hand on the floor behind you and bring your left elbow to the outside of your right knee."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '45 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60 secs/side', sets: '1', reps: '1', frequency: 'Daily' }
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
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'bah-rahd-vah-JAHS-anna',
          benefit: 'Improves digestion', 
          pranayama: ['Diaphragmatic'],
          mudra: ['Chin Mudra'],
          imageUrl: 'https://omstars.com/blog/wp-content/uploads/2021/09/Bharadvajasana.png',
          howToDo: [
            "Sit on the floor with legs straight out.",
            "Shift your weight onto your right buttock, bend your knees, and swing your legs to the left.",
            "Inhale to lengthen your spine. Exhale and twist your torso to the right.",
            "Place your right hand on the floor behind you and your left hand on your right thigh."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '45 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60 secs/side', sets: '1', reps: '1', frequency: 'Daily' }
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
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'mah-ree-chee-AHS-anna C',
          benefit: 'Massages organs', 
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://www.vinyasayogaashram.com/blog/wp-content/uploads/2023/10/marichyasana.jpg',
          howToDo: [
            "Sit with your left leg extended. Bend your right knee and place the foot on the floor, close to your inner left thigh.",
            "Exhale and twist to the right. Wrap your left arm around your right leg.",
            "Place your right fingertips on the floor behind you.",
            "For a deeper bind, clasp your hands behind your back."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '45 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60 secs/side', sets: '1', reps: '1', frequency: 'Daily' }
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
      id: 'phase6',
      title: 'Phase 6: Balance & Integration',
      description: 'Stabilize the body and mind. Cultivate focus, coordination, and inner equilibrium.',
      poses: [
        { 
          sanskritName: 'Vrksasana', 
          englishName: 'Tree Pose',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'vrik-SHAHS-anna',
          benefit: 'Improves balance', 
          pranayama: ['Equal'],
          mudra: ['Anjali Mudra'],
          imageUrl: 'https://images.unsplash.com/photo-1566501206165-001c4674c3e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          howToDo: [
            "Stand tall in Mountain Pose. Shift your weight to your left foot.",
            "Place your right foot on your left inner thigh (or calf, never the knee).",
            "Bring your hands to prayer position at your chest or raise them overhead.",
            "Find a focal point (Drishti) to help you balance. Hold and breathe."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 seconds', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '45-60 secs', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60+ seconds', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Focus: Enhances mental concentration and steadiness.",
            "Strength: Strengthens the legs, ankles, and core stabilizers.",
            "Poise: Cultivates physical and mental grace."
          ]
        },
        { 
          sanskritName: 'Garudasana', 
          englishName: 'Eagle Pose',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'gah-roo-DAHS-anna',
          benefit: 'Opens shoulders', 
          pranayama: ['Ujjayi'],
          mudra: ['Eagle Arms'],
          imageUrl: 'https://images.unsplash.com/photo-1599447421405-0753f5d10972?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          howToDo: [
            "Bend your knees slightly. Cross your right leg over your left thigh and hook the foot behind the calf.",
            "Cross your right arm under your left arm, bending elbows to bring palms together.",
            "Lift your elbows to shoulder height and press your forearms away from your face.",
            "Sit deeper into the squat and hold."
          ],
          frequency: [
            { level: 'Beginner', duration: '15-20 secs', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '30-45 secs', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '45-60 secs', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Flexibility: Deeply stretches the upper back, shoulders, and outer hips.",
            "Circulation: The 'squeeze and release' mechanism improves circulation to the joints.",
            "Balance: Requires strong focus and stability."
          ]
        }
      ]
    },
    {
      id: 'phase7',
      title: 'Phase 7: Forward Bends (Cool Down)',
      description: 'Calm the nervous system. Lengthen the spine and hamstrings to wind down.',
      poses: [
        { 
          sanskritName: 'Paschimottanasana', 
          englishName: 'Seated Forward Bend',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'posh-ee-moh-tan-AHS-anna',
          benefit: 'Calms the brain', 
          pranayama: ['Ujjayi', 'Extended Exhale'],
          mudra: ['None'],
          imageUrl: 'https://images.unsplash.com/photo-1599447292180-45fd84092efd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          howToDo: [
            "Sit with legs extended straight in front of you.",
            "Inhale and reach your arms up, lengthening the spine.",
            "Exhale and hinge at your hips to fold forward over your legs.",
            "Reach for your feet or shins. Keep the spine long, neck relaxed."
          ],
          frequency: [
            { level: 'Beginner', duration: '30-60 secs', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '1-2 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '3-5 mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Calming: Soothes the nervous system and relieves mild depression and anxiety.",
            "Flexibility: deeply stretches the entire back of the body, from heels to head.",
            "Digestion: Compresses the abdomen, stimulating digestive organs."
          ]
        },
        { 
          sanskritName: 'Balasana', 
          englishName: 'Child\'s Pose',
          schedule: ['Sun'],
          pronunciation: 'bah-LAHS-anna',
          benefit: 'Relaxation', 
          pranayama: ['Diaphragmatic', 'Equal'],
          mudra: ['None'],
          imageUrl: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          howToDo: [
            "Kneel on the floor, toes together and knees hip-width apart.",
            "Exhale and lower your torso between your knees.",
            "Extend your arms forward with palms down, or rest them alongside your body.",
            "Rest your forehead on the mat and breathe deeply."
          ],
          frequency: [
            { level: 'Beginner', duration: '1-2 mins', sets: '1', reps: '1', frequency: 'Anytime' },
            { level: 'Intermediate', duration: '3-5 mins', sets: '1', reps: '1', frequency: 'Anytime' },
            { level: 'Advanced', duration: '5+ mins', sets: '1', reps: '1', frequency: 'Anytime' }
          ],
          why: [
            "Rest: A deeply restorative pose that calms the mind and body.",
            "Release: Gently stretches the lower back, hips, thighs, and ankles.",
            "Grounding: Helps to feel grounded and connected to the earth."
          ]
        }
      ]
    },
    {
      id: 'phase8',
      title: 'Phase 8: Dhyana Asanas (Meditative Poses)',
      description: 'Cultivate mental stability and deep peace. Perfect for meditation and integrating your practice.',
      poses: [
        { 
          subCategory: 'Meditative Asanas',
          sanskritName: 'Vajrasana', 
          englishName: 'Thunderbolt Pose',
          schedule: ['Mon', 'Thu'],
          pronunciation: 'vah-JRAHS-anna',
          benefit: 'Aids digestion', 
          pranayama: ['Diaphragmatic'],
          mudra: ['Chin Mudra'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-vajrasana-main.jpg?raw=true',
          imageUrls: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-vajrasana-main.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-vajrasana-rear.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-vajrasana.jpg?raw=true'
          ],
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-vajrasana-main.jpg?raw=true',
          imageUrlsMale: [
             'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-vajrasana-main.jpg?raw=true',
             'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-vajrasana-rear.jpg?raw=true',
             'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-vajrasana.jpg?raw=true'
          ],
          howToDo: [
            "Kneel on the floor with knees close together.",
            "Sit back on your heels, keeping your spine straight.",
            "Place your hands on your knees, palms facing down.",
            "Keep your head straight and gaze forward."
          ],
          frequency: [
            { level: 'Beginner', duration: '2-5 mins', sets: '1', reps: '1', frequency: 'After meals' },
            { level: 'Intermediate', duration: '5-10 mins', sets: '1', reps: '1', frequency: 'After meals' },
            { level: 'Advanced', duration: '15+ mins', sets: '1', reps: '1', frequency: 'After meals' }
          ],
          why: [
            "Digestion: One of the few poses recommended immediately after eating to aid digestion.",
            "Stability: Provides a solid foundation for pranayama and meditation.",
            "Joint Health: Increases flexibility in the ankles and knees."
          ]
        },
        { 
          subCategory: 'Meditative Asanas',
          sanskritName: 'Padmasana', 
          englishName: 'Lotus Pose',
          schedule: ['Tue', 'Fri'],
          pronunciation: 'pad-MAHS-anna',
          benefit: 'Deep stability', 
          pranayama: ['Nadi Shodhana', 'Ujjayi'],
          mudra: ['Chin Mudra', 'Bhairava'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-padmasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-padmasana.jpg?raw=true',
          howToDo: [
            "Sit with legs extended. Bend the right knee and place the foot on the left thigh, heel close to the abdomen.",
            "Bend the left knee and place the foot on the right thigh, heel close to the abdomen.",
            "Keep the spine straight and shoulders relaxed.",
            "Place hands in a mudra on the knees."
          ],
          frequency: [
            { level: 'Beginner', duration: 'Avoid if painful', sets: '0', reps: '0', frequency: 'Caution' },
            { level: 'Intermediate', duration: '1-3 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '10+ mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Stability: The crossed legs create a solid base that holds the spine straight effortlessly.",
            "Focus: Locks the body in place, minimizing distraction and promoting deep concentration.",
            "Energy: Retains vital energy within the body."
          ]
        },
        { 
          subCategory: 'Meditative Asanas',
          sanskritName: 'Bhadrasana', 
          englishName: 'Gracious Pose',
          schedule: ['Wed', 'Sat'],
          pronunciation: 'bhad-RAHS-anna',
          benefit: 'Root chakra', 
          pranayama: ['Ujjayi'],
          mudra: ['Nasikagra Drishti'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-bhadrasana-main.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-bhadrasana-main.jpg?raw=true',
          howToDo: [
            "Sit in Vajrasana (kneeling). Separate your knees as wide as possible.",
            "Keep the toes in contact with each other behind you, allowing the buttocks to rest on the floor between the feet.",
            "Place hands on knees, keep spine straight.",
            "Gaze at the nose tip or close eyes."
          ],
          frequency: [
            { level: 'Beginner', duration: '1-2 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '3-5 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '10+ mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Hip Opener: Deeply opens the hips and pelvic region.",
            "Root Chakra: Stimulates the Mooladhara chakra.",
            "Digestion: beneficial for stomach ailments."
          ]
        },
        { 
          subCategory: 'Meditative Asanas',
          sanskritName: 'Siddhasana', 
          englishName: 'Perfect Pose',
          schedule: ['All'],
          pronunciation: 'sid-DHAHS-anna',
          benefit: 'Purifies energy', 
          pranayama: ['Kapalabhati', 'Bhastrika'],
          mudra: ['Chin Mudra'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-siddhasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-siddhasana.jpg?raw=true',
          howToDo: [
            "Sit with legs extended. Bend the left knee and place the heel near the perineum.",
            "Bend the right knee and place the right heel against the pubic bone, directly above the left heel.",
            "Tuck the toes of the right foot between the calf and thigh muscles of the left leg.",
            "Keep spine erect, hands in chin mudra on knees."
          ],
          frequency: [
            { level: 'Beginner', duration: '1-3 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '5-10 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '15-30+ mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Energy Control: Directs energy upwards to the higher chakras.",
            "Nervous System: Calms the nervous system and balances the mind.",
            "Flexibility: Increases flexibility in hips and knees."
          ]
        },
        { 
          subCategory: 'Meditative Asanas',
          sanskritName: 'Bhramari', 
          englishName: 'Bee Breath',
          schedule: ['All'],
          pronunciation: 'bhrah-MAH-ree',
          benefit: 'Soothes mind', 
          pranayama: ['Bhramari'],
          mudra: ['Shanmukhi Mudra'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-bhramari.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-bhramari.jpg?raw=true',
          howToDo: [
            "Sit comfortably with eyes closed.",
            "Place your index fingers on your ears (on the tragus cartilage).",
            "Inhale deeply through the nose.",
            "Exhale slowly while making a deep, steady humming sound like a bee.",
            "Feel the vibration resonate in the head."
          ],
          frequency: [
            { level: 'Beginner', sets: '1 round', reps: '5-10 breaths', frequency: 'As needed' },
            { level: 'Intermediate', sets: '1 round', reps: '10-20 breaths', frequency: 'As needed' },
            { level: 'Advanced', sets: '1 round', reps: '20+ breaths', frequency: 'As needed' }
          ],
          why: [
            "Anxiety Relief: Instantly calms the mind and reduces anger or anxiety.",
            "Insomnia: Helps induce deep sleep.",
            "Focus: Improves concentration and memory."
          ]
        },
        { 
          subCategory: 'Meditative Asanas',
          sanskritName: 'Sukhasana', 
          englishName: 'Easy Pose',
          // Schedule removed as requested
          pronunciation: 'soo-KAHS-anna',
          benefit: 'Meditation base', 
          pranayama: ['Nadi Shodhana', 'Equal'],
          mudra: ['Chin Mudra', 'Gyan Mudra'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-sukhasana-main.jpg?raw=true',
          imageUrls: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-sukhasana-main.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-sukhasana.jpg?raw=true'
          ],
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-sukhasana-main.jpg?raw=true',
          imageUrlsMale: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-sukhasana-main.jpg?raw=true',
             'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-sukhasana.jpg?raw=true'
          ],
          howToDo: [
            "Sit on the floor or a cushion with your legs crossed.",
            "Place each foot beneath the opposite knee.",
            "Keep your spine straight, head aligned with your neck.",
            "Rest your hands on your knees, palms up or down. Close your eyes and breathe."
          ],
          frequency: [
            { level: 'Beginner', duration: '1-5 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '5-15 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '20+ mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Mental Calm: A stable posture that centers the mind and reduces stress.",
            "Posture: Strengthens the back and improves body alignment.",
            "Meditation: The classic comfortable seat for breathwork and mindfulness."
          ]
        },
        { 
          subCategory: 'Relaxation Asanas',
          sanskritName: 'Savasana', 
          englishName: 'Corpse Pose',
          schedule: ['All'],
          pronunciation: 'shah-VAHS-anna',
          benefit: 'Deep relaxation', 
          pranayama: ['Diaphragmatic', 'Coherent'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-savasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-savasana.jpg?raw=true',
          howToDo: [
            "Lie flat on your back, legs extended and feet falling open.",
            "Arms rest alongside the body, palms facing up.",
            "Close your eyes and release all muscular tension.",
            "Remain completely still for 5-10 minutes, allowing the benefits of practice to integrate."
          ],
          frequency: [
            { level: 'Beginner', duration: '5 mins', sets: '1', reps: '1', frequency: 'End of practice' },
            { level: 'Intermediate', duration: '10 mins', sets: '1', reps: '1', frequency: 'End of practice' },
            { level: 'Advanced', duration: '15+ mins', sets: '1', reps: '1', frequency: 'End of practice' }
          ],
          why: [
            "Integration: Allows the body to absorb the benefits of the yoga practice.",
            "Stress Reduction: Triggers the parasympathetic nervous system (rest and digest).",
            "Rejuvenation: Completely relaxes the body and mind, reducing fatigue."
          ]
        }
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

  constructor() {
    effect(() => {
      const gender = this.selectedGender();
      if (gender === 'male') {
        this.renderer.addClass(this.document.body, 'male-theme');
      } else {
        this.renderer.removeClass(this.document.body, 'male-theme');
      }
    });
  }

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

  showWarmUp() {
    this.showWarmUpView.set(true);
    window.scrollTo(0, 0);
  }

  hideWarmUp() {
    this.showWarmUpView.set(false);
    window.scrollTo(0, 0);
  }

  getScheduleDisplay(schedule: string[] | undefined): string {
    if (!schedule || schedule.length === 0) return '';
    
    // Handle "All" case specifically
    if (schedule.includes('All')) return 'Daily';

    return schedule.map(day => {
      switch(day) {
        case 'Mon': return 'M';
        case 'Tue': return 'Tu';
        case 'Wed': return 'W';
        case 'Thu': return 'Th';
        case 'Fri': return 'F';
        case 'Sat': return 'Sa';
        case 'Sun': return 'Su';
        default: return day;
      }
    }).join(' - ');
  }
}