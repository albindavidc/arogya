
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PoseCategory, Pose } from './models/pose.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class AppComponent {
  readonly poseCategories = signal<PoseCategory[]>([
    {
      id: 'inversion',
      title: 'Inversion Poses',
      description: 'Boost Metabolism + Brain Energy. These improve blood flow, activate endocrine glands, and sharpen the mind.',
      poses: [
        { sanskritName: 'Sarvangasana', englishName: 'Shoulder Stand', benefit: 'Stimulates thyroid', imageUrl: 'https://www.rishikulyogshalarishikesh.com/blog/wp-content/uploads/2024/09/Shoulder-Stand-Pose-683x1024.jpg' },
        { sanskritName: 'Sirsasana', englishName: 'Headstand', benefit: 'Increases brain oxygen', imageUrl: 'https://omstars.com/blog/wp-content/uploads/2022/04/ig-feed-pose-breakdown-2022-Sirsasana.png' },
        { sanskritName: 'Halasana', englishName: 'Plow Pose', benefit: 'Boosts digestion & metabolism', imageUrl: 'https://www.theyogacollective.com/wp-content/uploads/2019/11/halasana-e1573741174986.jpg' },
        { sanskritName: 'Viparita Karani', englishName: 'Legs-Up-the-Wall', benefit: 'Reduces fatigue, restores energy', imageUrl: 'https://i.imgur.com/Is3s1mC.jpeg' },
      ],
    },
    {
      id: 'backbends',
      title: 'Backbends',
      description: 'Activate thyroid, adrenal & nervous system. Backbends open the chest for more oxygen and more energy.',
      poses: [
        { sanskritName: 'Bhujangasana', englishName: 'Cobra Pose', benefit: 'Energizes the spine', imageUrl: 'https://rishikeshashtangayogaschool.com/blog/wp-content/uploads/2021/11/cobra-pose_11zon.jpg' },
        { sanskritName: 'Urdhva Mukha Svanasana', englishName: 'Upward Facing Dog', benefit: 'Opens chest and lungs', imageUrl: 'https://cdn.yogajournal.com/wp-content/uploads/2021/12/Upward-Facing-Dog_Andrew-Clark.jpg' },
        { sanskritName: 'Dhanurasana', englishName: 'Bow Pose', benefit: 'Powerful metabolic booster', imageUrl: 'https://www.theyogacollective.com/wp-content/uploads/2019/10/AdobeStock_193776647-1-1200x800.jpeg' },
        { sanskritName: 'Chakrasana', englishName: 'Wheel Pose', benefit: 'Energizes entire body', imageUrl: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&q=80' },
      ],
    },
    {
      id: 'twists',
      title: 'Twisting Poses',
      description: 'Improve digestion + detox. Twists massage the digestive organs for better metabolism.',
      poses: [
        { sanskritName: 'Ardha Matsyendrasana', englishName: 'Half Spinal Twist', benefit: 'Stimulates liver and kidneys', imageUrl: 'https://www.keralatourism.org/images/yoga/static-banner/large/Ardha_Matsyendrasana_-_The_Spinal_Twist-07032020173900.jpg' },
        { sanskritName: 'Bharadvajasana', englishName: 'Seated Twist', benefit: 'Improves digestive health', imageUrl: 'https://omstars.com/blog/wp-content/uploads/2021/09/Bharadvajasana.png' },
        { sanskritName: 'Marichyasana C', englishName: 'Marichi\'s Twist', benefit: 'Massages abdominal organs', imageUrl: 'https://www.vinyasayogaashram.com/blog/wp-content/uploads/2023/10/marichyasana.jpg' },
      ],
    },
    {
      id: 'standing',
      title: 'Standing & Power Poses',
      description: 'Increase heat + burn calories. These dynamic poses build strength and stamina.',
      poses: [
        { sanskritName: 'Virabhadrasana I', englishName: 'Warrior 1', benefit: 'Builds strength and confidence', imageUrl: 'https://i.imgur.com/sSg1E5a.jpeg' },
        { sanskritName: 'Virabhadrasana II', englishName: 'Warrior 2', benefit: 'Improves balance and concentration', imageUrl: 'https://liforme.com/cdn/shop/articles/0019_Warrior_II_-_Virabhadrasana_II_08_Laruga_31ba9e6e-26d7-42d2-b673-724fbd06a4f5.jpg' },
        { sanskritName: 'Utkatasana', englishName: 'Chair Pose', benefit: 'Boosts calorie burn', imageUrl: 'https://omstars.com/blog/wp-content/uploads/2022/07/how-to-do-Utkatasana.png' },
        { sanskritName: 'Surya Namaskar', englishName: 'Sun Salutation', benefit: 'Best for metabolism', imageUrl: 'https://i.imgur.com/rM7f8v3.jpeg' },
      ],
    },
    {
      id: 'core',
      title: 'Core & Abdominal Poses',
      description: 'Strengthen digestive fire. A strong core supports a healthy digestive system.',
      poses: [
        { sanskritName: 'Navasana', englishName: 'Boat Pose', benefit: 'Strengthens abs and spine', imageUrl: 'https://cdn.prod.website-files.com/67691f03eb5bfa3289b3dae7/67691f03eb5bfa3289b3ea9b_boat-pose-yoga.jpeg' },
        { sanskritName: 'Kumbhakasana', englishName: 'Plank Pose', benefit: 'Tones all core muscles', imageUrl: 'https://cdn.yogajournal.com/wp-content/uploads/2021/05/Plank-Pose_Andrew-Clark_2400x1350.jpeg' },
        { sanskritName: 'Paripurna Navasana', englishName: 'Full Boat Pose', benefit: 'Deepens core engagement', imageUrl: 'https://cdn.yogajournal.com/wp-content/uploads/2021/10/Boat-Pose_Andrew-Clark_2400x1350.jpeg' },
      ],
    },
    {
      id: 'pranayama',
      title: 'Pranayama',
      description: 'Breathing that boosts metabolism. These are not poses but are essential for energy.',
      poses: [
        { sanskritName: 'Kapalbhati', englishName: 'Skull Shining Breath', benefit: 'Increases metabolic rate', imageUrl: 'https://shivohamyogaschool.com/wp-content/uploads/2022/01/How-To-Do-Kapalbhati-Pranayama.jpg' },
        { sanskritName: 'Bhastrika', englishName: 'Bellows Breath', benefit: 'Boosts energy instantly', imageUrl: 'https://www.flexifyme.com/blogs/wp-content/uploads/2025/07/Bhramari-Pranayama.png' },
        { sanskritName: 'Ujjayi Breath', englishName: 'Victorious Breath', benefit: 'Activates thyroid & warms the body', imageUrl: 'https://d5sbbf6usl3xq.cloudfront.net/ujjayi_yoga.png' },
      ],
    },
  ]);

  readonly topPoses = signal<Pose[]>([
    { sanskritName: 'Sarvangasana', englishName: 'Shoulder Stand', benefit: 'Stimulates thyroid', imageUrl: 'https://www.rishikulyogshalarishikesh.com/blog/wp-content/uploads/2024/09/Shoulder-Stand-Pose-683x1024.jpg' },
    { sanskritName: 'Surya Namaskar', englishName: 'Sun Salutation', benefit: 'Best for metabolism', imageUrl: 'https://i.imgur.com/rM7f8v3.jpeg' },
    { sanskritName: 'Navasana', englishName: 'Boat Pose', benefit: 'Strengthens abs and spine', imageUrl: 'https://cdn.prod.website-files.com/67691f03eb5bfa3289b3dae7/67691f03eb5bfa3289b3ea9b_boat-pose-yoga.jpeg' },
    { sanskritName: 'Kapalbhati', englishName: 'Skull Shining Breath', benefit: 'Increases metabolic rate', imageUrl: 'https://shivohamyogaschool.com/wp-content/uploads/2022/01/How-To-Do-Kapalbhati-Pranayama.jpg' },
    { sanskritName: 'Dhanurasana', englishName: 'Bow Pose', benefit: 'Powerful metabolic booster', imageUrl: 'https://www.theyogacollective.com/wp-content/uploads/2019/10/AdobeStock_193776647-1-1200x800.jpeg' },
  ]);

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
