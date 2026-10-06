import { Response } from 'express';
import Settings from '../models/Settings';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

export const getSettings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to get settings', 500);
  }
};

export const updateSettings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      heroTitle,
      heroSubtitle,
      heroImage,
      aboutText,
      businessHours,
      faqs,
      metaTitle,
      metaDescription,
    } = req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    if (heroTitle !== undefined) settings.heroTitle = heroTitle;
    if (heroSubtitle !== undefined) settings.heroSubtitle = heroSubtitle;
    if (heroImage !== undefined) settings.heroImage = heroImage;
    if (aboutText !== undefined) settings.aboutText = aboutText;
    if (businessHours !== undefined) settings.businessHours = businessHours;
    if (faqs !== undefined) settings.faqs = faqs;
    if (metaTitle !== undefined) settings.metaTitle = metaTitle;
    if (metaDescription !== undefined) settings.metaDescription = metaDescription;

    await settings.save();

    res.status(200).json({
      success: true,
      data: settings,
      message: 'Settings updated successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update settings', 500);
  }
};